"use client";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { 
  MagnifyingGlassPlusIcon, 
  MagnifyingGlassMinusIcon, 
  ArrowsPointingInIcon, 
  PencilIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';
import { showError, showSuccess } from "@/utils/toastUtils";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import { motion, AnimatePresence } from "framer-motion";
import TextInput from "@/components/Common/Form/TextInput";
import symbolicData from "@/../symbolic_ai.json";

function symbolicJsonToMarkdown(data) {
  if (!data || !data.plant) return "";
  let md = `# ${data.plant.name || "Process Plant"}\n`;
  
  (data.plant.equipment || []).forEach(eq => {
    md += `## ${eq.name}\n`;
    (eq.issues || []).forEach(issue => {
      md += `### ❗ Issue: ${issue.issue}\n`;
      md += `#### 📋 Rule: ${issue.rule}\n`;
      (issue.causes || []).forEach(cause => {
        md += `##### 🔍 Cause: ${cause.cause}\n`;
        (cause.checks || []).forEach(check => {
          md += `###### 🛠️ Check: ${check.condition}\n`;
          md += `- ✅ Action: ${check.action}\n`;
        });
      });
    });
  });
  return md;
}

export default function MarkmapComponent() {
  const refSvg = useRef(null);
  const markmapInstance = useRef(null);
  const zoomBehavior = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [ruleInput, setRuleInput] = useState("");
  const [queryInput, setQueryInput] = useState("");

  
  const refContainer = useRef(null);

  useEffect(() => {
    if (!refSvg.current) return;

    setLoading(true);
    try {
      const markdown = symbolicJsonToMarkdown(symbolicData);
      const transformer = new Transformer();
      const { root } = transformer.transform(markdown);

      if (markmapInstance.current) {
        markmapInstance.current.destroy();
      }

      markmapInstance.current = Markmap.create(refSvg.current, {
        initialExpandLevel: 2,
        maxWidth: 400,
        spacingVertical: 12,
        spacingHorizontal: 110,
        paddingX: 20,
        autoFit: true,
      }, root);

      // Apply Light Theme styling to SVG
      const svg = d3.select(refSvg.current);
      svg.style("background", "transparent");
      refSvg.current.style.setProperty("--markmap-text-color", "#0f172a"); // Slate 900
      refSvg.current.style.setProperty("--markmap-circle-open-bg", "#f1f5f9"); // Slate 100
      
      zoomBehavior.current = markmapInstance.current.zoom;

      // Ensure view is centered and fitted nicely after a slightly longer delay to avoid SVGLength errors
      setTimeout(() => {
        if (refContainer.current && refContainer.current.offsetWidth > 0) {
          markmapInstance.current?.fit();
        }
      }, 500);
    } catch (err) {
      console.error("Failed to render hierarchy:", err);
      showError("Failed to render Symbolic AI hierarchy");
    } finally {
      setLoading(false);
    }
  }, []);

  const zoomIn = () => zoomBehavior.current && d3.select(refSvg.current).transition().call(zoomBehavior.current.scaleBy, 1.2);
  const zoomOut = () => zoomBehavior.current && d3.select(refSvg.current).transition().call(zoomBehavior.current.scaleBy, 0.8);
  const fit = () => markmapInstance.current?.fit();

  return (
    <div className="w-full h-[calc(100vh-120px)] bg-slate-50 flex flex-col rounded-3xl overflow-hidden border border-slate-200 shadow-inner" ref={refContainer}>
      {loading && <RippleLoader />}
      
      {/* Header / Controls */}
      <div className="p-5 bg-white border-b border-slate-200 flex items-center justify-between z-10 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-4">
            <img src="/logo/domainwise_logo_preview.png" alt="DomainWise Logo" className="w-16 h-auto" />
            Symbolic <span className="text-blue-600">AI</span> 
          </h1>
          <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-[0.2em]">Symbolic Root Cause Logic</p>
        </div>

        <div className="flex items-center gap-4">
          
          <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1 shadow-inner">
            <button onClick={zoomIn} className="p-2 bg-white shadow-sm hover:shadow-md rounded-xl transition-all text-slate-600 hover:text-blue-600" title="Zoom In">
              <MagnifyingGlassPlusIcon className="h-5 w-5" />
            </button>
            <button onClick={zoomOut} className="p-2 bg-white shadow-sm hover:shadow-md rounded-xl transition-all text-slate-600 hover:text-blue-600" title="Zoom Out">
              <MagnifyingGlassMinusIcon className="h-5 w-5" />
            </button>
            <button onClick={fit} className="p-2 bg-white shadow-sm hover:shadow-md rounded-xl transition-all text-slate-600 hover:text-blue-600" title="Fit to Screen">
              <ArrowsPointingInIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px]">
        {!loading && (
          <svg ref={refSvg} className="w-full h-full cursor-grab active:cursor-grabbing font-sans"></svg>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="p-5 bg-white hover:bg-blue-600 hover:text-white text-blue-600 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-slate-100 transition-all hover:scale-110 active:scale-90 group"
          title="Update Rules"
        >
          <PencilIcon className="h-7 w-7 group-hover:-rotate-12 transition-transform" />
        </button>
      </div>

      {/* Modern Dialogs */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100 w-full max-w-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400" />
              
              <div className="relative mb-8 text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Update Symbolic Logic</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute -top-2 -right-2 p-3 hover:bg-slate-100 rounded-2xl transition-colors"
                >
                  <XMarkIcon className="w-7 h-7 text-slate-300 hover:text-slate-600" />
                </button>
                <div className="mt-4 h-1.5 w-24 mx-auto bg-blue-600 rounded-full shadow-sm" />
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-200/60">
                   <p className="text-base text-slate-500 mb-4 font-medium">Add natural language rules to refine the symbolic knowledge base.</p>
                   <TextInput
                    value={ruleInput}
                    onChange={(e) => setRuleInput(e.target.value)}
                    placeholder="e.g., 'If temperature of Day Tank > 45°C, flag a potential evaporation loss alert.'"
                    rows={5}
                    className="bg-white border-slate-200 focus:border-blue-500 rounded-2xl shadow-sm text-lg"
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => {
                      showSuccess("Knowledge base updated successfully");
                      setShowModal(false);
                      setRuleInput("");
                    }}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black rounded-3xl shadow-2xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98] tracking-wide"
                  >
                    DEPLOY TO KNOWLEDGE BASE
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .markmap-node text {
          font-family: 'Inter', sans-serif !important;
          font-weight: 700 !important;
          font-size: 15px !important;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .markmap-node:hover text {
          fill: #2563eb !important;
          font-weight: 900 !important;
          transform: scale(1.1);
        }
        .markmap-link {
          stroke: #334155 !important;
          stroke-width: 2px !important;
          opacity: 0.9;
        }
        .markmap-node-circle {
          fill: #ffffff !important;
          stroke: #2563eb !important;
          stroke-width: 3px !important;
          r: 6px !important;
        }
      `}</style>
    </div>
  );
}
