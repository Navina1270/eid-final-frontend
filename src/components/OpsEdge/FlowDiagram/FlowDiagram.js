"use client";

import React, { useCallback, memo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { useRouter } from "next/navigation";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";

/* ------------------------------------------------------------------
   CUSTOM NODE: GROUP NODE (Process Sections)
-------------------------------------------------------------------*/
const GroupNodeComp = ({ data }) => (
  <div
      style={{
        padding: "45px 15px 15px",
        borderRadius: "28px",
        background: data.bgColor || "rgba(241, 245, 249, 0.8)",
        border: "2px solid rgba(203, 213, 225, 0.4)",
        minHeight: "100%",
        width: "100%",
        position: "relative",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
      }}
  >
    <div
      style={{
        position: "absolute",
        top: "-14px",
        left: "24px",
        color: "#475569",
        fontSize: "10px",
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        whiteSpace: "nowrap",
        backgroundColor: "#f8fafc",
        padding: "4px 14px",
        borderRadius: "99px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
      }}
    >
      {data.label}
    </div>
  </div>
);

/* ------------------------------------------------------------------
   PROCESS NODES
-------------------------------------------------------------------*/
const steps = [
  // Section Groups
  {
    id: "group_distillation",
    label: "Primary Distillation Section",
    position: { x: 380, y: 50 },
    type: "groupNode",
    style: { width: 220, height: 950 },
    data: { bgColor: "rgba(219, 234, 254, 0.4)" },
  },
  {
    id: "group_ena",
    label: "ENA Section",
    position: { x: 720, y: 150 },
    type: "groupNode",
    style: { width: 220, height: 350 },
    data: { bgColor: "rgba(220, 252, 231, 0.4)" },
  },
  {
    id: "group_anhydrous",
    label: "Anhydrous Section",
    position: { x: 1020, y: 100 },
    type: "groupNode",
    style: { width: 220, height: 400 },
    data: { bgColor: "rgba(254, 243, 199, 0.4)" },
  },

  // Feed Section
  {
    id: "molasses_day_tank",
    label: "Molasses day tank",
    position: { x: 100, y: 200 },
    type: "processNode",
  },
  {
    id: "pre_fermenters",
    label: "Pre fermenters",
    position: { x: 100, y: 380 },
    type: "processNode",
  },
  {
    id: "fermenters",
    label: "Fermenters",
    position: { x: 100, y: 560 },
    type: "processNode",
  },

  // Distillation Section
  {
    id: "degassifier",
    label: "DeGassifier column",
    position: { x: 35, y: 20 },
    parentId: "group_distillation",
    type: "processNode",
  },
  {
    id: "analyser",
    label: "Analyser column",
    position: { x: 35, y: 190 },
    parentId: "group_distillation",
    type: "processNode",
  },
  {
    id: "prerectifier",
    label: "PreRectifier column",
    position: { x: 35, y: 360 },
    parentId: "group_distillation",
    type: "processNode",
  },
  {
    id: "extractive_distillation",
    label: "Extractive distillation Column",
    position: { x: 35, y: 530 },
    parentId: "group_distillation",
    type: "processNode",
  },
  {
    id: "rectifier",
    label: "Rectifier Column",
    position: { x: 35, y: 700 },
    parentId: "group_distillation",
    type: "processNode",
  },
  {
    id: "label_rectified",
    label: "Rectified spirit",
    position: { x: 45, y: 850 },
    parentId: "group_distillation",
    type: "labelNode",
    data: { transparent: false }
  },

  // ENA Section
  {
    id: "recovery",
    label: "Recovery Column",
    position: { x: 35, y: 20 },
    parentId: "group_ena",
    type: "processNode",
  },
  {
    id: "simmering",
    label: "Simmering Column",
    position: { x: 35, y: 190 },
    parentId: "group_ena",
    type: "processNode",
  },
  {
    id: "label_ena",
    label: "Extra neutral alcohol",
    position: { x: 25, y: 320 },
    parentId: "group_ena",
    type: "labelNode",
    data: { transparent: false }
  },

  // Anhydrous Section
  {
    id: "evaporator",
    label: "Evaporator Column",
    position: { x: 35, y: 20 },
    parentId: "group_anhydrous",
    type: "processNode",
  },
  {
    id: "msdh",
    label: "MSDH column",
    position: { x: 35, y: 190 },
    parentId: "group_anhydrous",
    type: "processNode",
  },
  {
    id: "label_anhydrous",
    label: "Anhydrous ethanol",
    position: { x: 25, y: 320 },
    parentId: "group_anhydrous",
    type: "labelNode",
    data: { transparent: false }
  },

  // Boiler
  {
    id: "boiler",
    label: "Boiler",
    position: { x: 600, y: 920 },
    type: "boilerNode",
  },

  // Junctions
  { id: "j_dist_bottom", position: { x: 350, y: 950 }, type: "junctionNode" },
  { id: "j_dist_riser", position: { x: 350, y: 150 }, type: "junctionNode" },
  { id: "j_ena_bottom", position: { x: 720, y: 950 }, type: "junctionNode" },
  { id: "j_ena_riser", position: { x: 720, y: 250 }, type: "junctionNode" },
  { id: "j_anh_bottom", position: { x: 1020, y: 950 }, type: "junctionNode" },
  { id: "j_anh_riser", position: { x: 1020, y: 150 }, type: "junctionNode" },
];

/* ------------------------------------------------------------------
   EDGES
-------------------------------------------------------------------*/
const blueArrow = {
  animated: true,
  style: { strokeWidth: 4, stroke: "#2563eb" },
  markerEnd: { type: MarkerType.ArrowClosed, color: "#2563eb" },
};

const orangeArrow = {
  animated: true,
  style: { strokeWidth: 3.5, stroke: "#f97316" },
  markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316" },
};

const edges = [
  // Feed
  { id: "e-mol-pre", source: "molasses_day_tank", sourceHandle: "bottom", target: "pre_fermenters", targetHandle: "top", type: "straight", ...blueArrow },
  { id: "e-pre-ferm", source: "pre_fermenters", sourceHandle: "bottom", target: "fermenters", targetHandle: "top", type: "straight", ...blueArrow },
  
  // Feed to Dist
  {
    id: "e-ferm-deg",
    source: "fermenters",
    sourceHandle: "right",
    target: "degassifier",
    targetHandle: "top",
    type: "smoothstep",
    ...blueArrow,
  },

  // Dist Stack
  { id: "e-deg-anal", source: "degassifier", sourceHandle: "bottom", target: "analyser", targetHandle: "top", type: "straight", ...blueArrow },
  { id: "e-anal-prerect", source: "analyser", sourceHandle: "bottom", target: "prerectifier", targetHandle: "top", type: "straight", ...blueArrow },
  { id: "e-prerect-ext", source: "prerectifier", sourceHandle: "bottom", target: "extractive_distillation", targetHandle: "top", type: "straight", ...blueArrow },
  { id: "e-ext-rect", source: "extractive_distillation", sourceHandle: "bottom", target: "rectifier", targetHandle: "top", type: "straight", ...blueArrow },
  { id: "e-rect-label", source: "rectifier", sourceHandle: "bottom", target: "label_rectified", targetHandle: "top", type: "straight", ...blueArrow },

  // ENA Stack
  {
    id: "e-anal-recovery",
    source: "rectifier",
    sourceHandle: "right",
    target: "recovery",
    targetHandle: "top",
    type: "smoothstep",
    ...blueArrow,
  },
  { id: "e-recovery-simm", source: "recovery", sourceHandle: "bottom", target: "simmering", targetHandle: "top", type: "straight", ...blueArrow },
  { id: "e-simm-label", source: "simmering", sourceHandle: "bottom", target: "label_ena", targetHandle: "top", type: "straight", ...blueArrow },

  // Anhydrous Stack
  {
    id: "e-simm-evap",
    source: "simmering",
    sourceHandle: "right",
    target: "evaporator",
    targetHandle: "top",
    type: "smoothstep",
    ...blueArrow,
  },
  { id: "e-evap-msdh", source: "evaporator", sourceHandle: "bottom", target: "msdh", targetHandle: "top", type: "straight", ...blueArrow },
  { id: "e-msdh-label", source: "msdh", sourceHandle: "bottom", target: "label_anhydrous", targetHandle: "top", type: "straight", ...blueArrow },

  // Steam
  { id: "s-boiler-j-dist", source: "boiler", sourceHandle: "left", target: "j_dist_bottom", targetHandle: "r_in", type: "smoothstep", ...orangeArrow, animated: false },
  { id: "s-j-dist-ena", source: "j_dist_bottom", sourceHandle: "r_out", target: "j_ena_bottom", targetHandle: "l_in", type: "smoothstep", ...orangeArrow, animated: false },
  { id: "s-j-ena-anh", source: "j_ena_bottom", sourceHandle: "r_out", target: "j_anh_bottom", targetHandle: "l_in", type: "smoothstep", ...orangeArrow, animated: false },

  // Dist Riser
  { id: "s-dist-riser", source: "j_dist_bottom", sourceHandle: "t_out", target: "j_dist_riser", targetHandle: "b_in", type: "smoothstep", ...orangeArrow },
  { id: "s-riser-ferm", source: "j_dist_bottom", sourceHandle: "t_out", target: "fermenters", targetHandle: "orange_left", type: "smoothstep", ...orangeArrow },
  { id: "s-riser-deg", source: "j_dist_riser", sourceHandle: "r_out", target: "degassifier", targetHandle: "orange_left", type: "smoothstep", ...orangeArrow },
  { id: "s-riser-anal", source: "j_dist_riser", sourceHandle: "r_out", target: "analyser", targetHandle: "orange_left", type: "smoothstep", ...orangeArrow },
  { id: "s-riser-prerect", source: "j_dist_riser", sourceHandle: "r_out", target: "prerectifier", targetHandle: "orange_left", type: "smoothstep", ...orangeArrow },
  { id: "s-riser-ext", source: "j_dist_riser", sourceHandle: "r_out", target: "extractive_distillation", targetHandle: "orange_left", type: "smoothstep", ...orangeArrow },
  { id: "s-riser-rect", source: "j_dist_riser", sourceHandle: "r_out", target: "rectifier", targetHandle: "orange_left", type: "smoothstep", ...orangeArrow },

  // ENA Riser
  { id: "s-ena-riser", source: "j_ena_bottom", sourceHandle: "t_out", target: "j_ena_riser", targetHandle: "b_in", type: "smoothstep", ...orangeArrow },
  { id: "s-riser-rec", source: "j_ena_riser", sourceHandle: "r_out", target: "recovery", targetHandle: "orange_left", type: "smoothstep", ...orangeArrow },
  { id: "s-riser-simm", source: "j_ena_riser", sourceHandle: "r_out", target: "simmering", targetHandle: "orange_left", type: "smoothstep", ...orangeArrow },
  { id: "s-riser-ena-boiler", source: "j_ena_riser", sourceHandle: "b_out", target: "boiler", targetHandle: "top", type: "smoothstep", ...orangeArrow },

  // Anhydrous Riser
  { id: "s-anh-riser", source: "j_anh_bottom", sourceHandle: "t_out", target: "j_anh_riser", targetHandle: "b_in", type: "smoothstep", ...orangeArrow },
  { id: "s-riser-evap", source: "j_anh_riser", sourceHandle: "r_out", target: "evaporator", targetHandle: "orange_left", type: "smoothstep", ...orangeArrow },
  { id: "s-riser-msdh", source: "j_anh_riser", sourceHandle: "r_out", target: "msdh", targetHandle: "orange_left", type: "smoothstep", ...orangeArrow },
];

/* ------------------------------------------------------------------
   CUSTOM NODE: PROCESS NODE (Standard column/tank blocks)
-------------------------------------------------------------------*/
const ProcessNodeComp = ({ data }) => {
  const mapping = {
    "Molasses day tank": "Molasses Day Tank",
    "DeGassifier column": "DeGassifier Column",
    "Analyser column": "Analyser Column",
    "PreRectifier column": "PreRectifier Column",
    "Extractive distillation Column": "Extractive Distillation Column_cleanup",
    "Rectifier Column": "Rectifier Column",
    "Recovery Column": "Recovery Column",
    "Simmering Column": "Simmering Column",
    "Evaporator Column": "Evaporator Column",
    "MSDH column": "MSDH Column",
    "Pre fermenters": "Pre Fermenters",
    "Pre Fermenters": "Pre Fermenters",
  };
  const name = mapping[data.label] || data.label;
  const imagePath = `/images/${name}.png`;

  return (
    <div
      title={data.label}
      style={{
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        padding: "16px 12px",
        borderRadius: "20px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        cursor: data.clickable ? "pointer" : "default",
        transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
        position: "relative"
      }}
      onClick={data.onClick}
    >
      <Handle type="source" position={Position.Right} id="right" style={{ background: "#3b82f6", width: 8, height: 8, border: "2px solid white" }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: "#3b82f6", width: 8, height: 8, border: "2px solid white" }} />
      <Handle type="target" position={Position.Left} id="left" style={{ background: "#3b82f6", width: 8, height: 8, border: "2px solid white" }} />
      <Handle type="target" position={Position.Top} id="top" style={{ background: "#f97316", width: 8, height: 8, border: "2px solid white" }} />
      <Handle type="target" position={Position.Left} id="orange_left" style={{ background: "#f97316", top: "75%", width: 8, height: 8, border: "2px solid white" }} />

      <div style={{
        width: "100%",
        height: "90px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "12px",
      }}>
        <img
          src={imagePath}
          alt={data.label}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.08))",
          }}
        />
      </div>

      <div
        style={{
          color: "#1e293b",
          fontSize: 12,
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.3,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: "-0.01em"
        }}
      >
        {data.label}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------
   CUSTOM NODE: BOILER NODE (Main emphasized component)
-------------------------------------------------------------------*/
const BoilerNodeComp = ({ data }) => (
  <div
    title="Boiler — Click to view details"
    style={{
      background: "#ffffff",
      borderRadius: "32px",
      padding: "24px",
      textAlign: "center",
      cursor: data.clickable ? "pointer" : "default",
      transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
      border: "3px solid #3b82f6",
      boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
      position: "relative"
    }}
    onClick={data.onClick}
  >
    <Handle type="source" position={Position.Top} id="top" style={{ background: "#f97316", width: 12, height: 12, border: "2px solid white" }} />
    <Handle type="source" position={Position.Right} id="right" style={{ background: "#f97316", width: 12, height: 12, border: "2px solid white" }} />
    <Handle type="source" position={Position.Left} id="left" style={{ background: "#f97316", width: 12, height: 12, border: "2px solid white" }} />

    <img
      src="/images/Boiler.png"
      alt="Boiler"
      style={{
        width: "180px",
        height: "auto",
        filter: "drop-shadow(0 20px 25px rgba(0,0,0,0.15))",
      }}
    />
    <div
      style={{
        color: "#1e293b",
        fontWeight: 900,
        fontSize: 18,
        letterSpacing: "-0.02em",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {data.label}
    </div>
    <div style={{ fontSize: 10, color: "#3b82f6", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Main Process Unit</div>
  </div>
);

/* ------------------------------------------------------------------
   CUSTOM NODE: LABEL NODE (Output product labels)
-------------------------------------------------------------------*/
const LabelNodeComp = ({ data }) => (
  <div
    onClick={data.onClick}
    style={{
      background: data.transparent ? "transparent" : "rgba(255, 255, 255, 1)",
      border: data.transparent ? "none" : "2px solid #2563eb",
      padding: data.transparent ? "0" : "8px 16px",
      borderRadius: "12px",
      color: "#2563eb",
      fontSize: "14px",
      fontWeight: "800",
      whiteSpace: "nowrap",
      cursor: data.clickable ? "pointer" : "default",
      transition: "all 0.2s ease",
    }}
  >
    <Handle type="target" position={Position.Top} id="top" style={{ background: "#4a9eff" }} />
    <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: "#4a9eff" }} />
    {data.label}
  </div>
);

/* ------------------------------------------------------------------
   CUSTOM NODE: JUNCTION NODE (Hidden manifold anchor points)
-------------------------------------------------------------------*/
const JunctionNodeComp = () => (
    <div style={{ width: 6, height: 6, background: "#f97316", borderRadius: "50%", border: "2px solid white", boxShadow: "0 0 10px rgba(249, 115, 22, 0.4)" }}>
        <Handle type="target" position={Position.Top} id="t_in" style={{ opacity: 0 }} />
        <Handle type="target" position={Position.Bottom} id="b_in" style={{ opacity: 0 }} />
        <Handle type="target" position={Position.Left} id="l_in" style={{ opacity: 0 }} />
        <Handle type="target" position={Position.Right} id="r_in" style={{ opacity: 0 }} />
        
        <Handle type="source" position={Position.Top} id="t_out" style={{ opacity: 0 }} />
        <Handle type="source" position={Position.Bottom} id="b_out" style={{ opacity: 0 }} />
        <Handle type="source" position={Position.Left} id="l_out" style={{ opacity: 0 }} />
        <Handle type="source" position={Position.Right} id="r_out" style={{ opacity: 0 }} />
    </div>
);

const ProcessNode = memo(ProcessNodeComp);
const BoilerNode = memo(BoilerNodeComp);
const LabelNode = memo(LabelNodeComp);

const nodeTypes = {
  processNode: ProcessNode,
  boilerNode: BoilerNode,
  labelNode: LabelNode,
  junctionNode: JunctionNodeComp,
  groupNode: memo(GroupNodeComp),
};

/* ------------------------------------------------------------------
   MAIN FLOW DIAGRAM COMPONENT
-------------------------------------------------------------------*/
export default function FlowDiagram() {
  const onInit = useCallback((instance) => instance.fitView({ padding: 0.15 }), []);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const redirectToEquipment = (eqId) => {
    setLoading(true);
    sessionStorage.setItem("equipment", eqId);
    router.push("/opsedge/home");
  };

  // Inject parentId and click handler into nodes
  const nodes = steps.map((s) => ({
    id: s.id,
    type: s.type,
    position: s.position,
    parentId: s.parentId,
    style: s.style,
    extent: s.extent,
    data: {
      ...s.data,
      label: s.label,
      onClick:
        s.type === "boilerNode"
          ? () => redirectToEquipment("C001#EQ001")
          : undefined,
      clickable: s.type === "boilerNode",
    },
  }));

  return (
    <>
      {loading && <RippleLoader />}
      {!loading && (
        <div style={{ height: "85vh", width: "100%" }}>
          <div
            style={{
              textAlign: "center",
              padding: "10px 0 4px",
              fontSize: 22,
              fontWeight: 700,
              color: "#2563eb",
              letterSpacing: 1,
            }}
          >
            Process Flow — Ethanol Plant
          </div>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 28,
              marginBottom: 4,
              fontSize: 13,
              color: "#475569",
              fontWeight: 500,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 28, height: 3, background: "#4a9eff", display: "inline-block", borderRadius: 2 }} />
              Process Flow
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 28, height: 3, background: "#f97316", display: "inline-block", borderRadius: 2, borderTop: "2px dashed #f97316" }} />
              Steam / Heat (from Boiler)
            </span>
          </div>

          <div style={{ height: "78vh", width: "100%", position: "relative" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onInit={onInit}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              minZoom={0.3}
              maxZoom={1.8}
            >
              <Background gap={30} color="#e2e8f0" style={{ background: "#f8fafc" }} />
              <Controls style={{ background: "#ffffff", border: "1px solid #cbd5e1" }} />
            </ReactFlow>
          </div>
        </div>
      )}
    </>
  );
}
