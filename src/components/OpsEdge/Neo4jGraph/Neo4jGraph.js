"use client";
import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import hierarchyData from "@/../Updated_hierarchy.json";
import { 
  RectangleGroupIcon, 
  InformationCircleIcon,
  ChevronRightIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowsPointingInIcon,
  DocumentIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/solid";

const levelColors = [
  "#2563eb", // ROOT (Blue 600)
  "#0891b2", // PLANT (Cyan 600)
  "#059669", // PROCESS (Emerald 600)
  "#7c3aed", // UNIT (Violet 600)
  "#ea580c", // PARAMETER (Orange 600)
  "#f59e0b", // TAG (Amber 500)
  "#64748b", // DOCUMENT (Slate 500)
];

const parseHierarchyToGraph = (data) => {
  const nodes = [];
  const links = [];
  const seenNodes = new Set();

  const relationshipToLevel = {
    "ROOT": 0,
    "HAS_PLANT": 1,
    "HAS_PROCESS": 2,
    "HAS_UNIT": 3,
    "HAS_PARAMETER": 4,
    "HAS_TAG": 5,
    "HAS_DOCUMENT": 6
  };

  const traverse = (name, obj, parentId = null, level = 0) => {
    const nodeId = `${level}-${name.replace(/\s+/g, '_')}`;
    
    if (!seenNodes.has(nodeId)) {
      const relationship = obj.relationship || "NODE";
      const actualLevel = relationshipToLevel[relationship] !== undefined ? relationshipToLevel[relationship] : level;
      const type = relationship.replace("HAS_", "");

      nodes.push({ 
          id: nodeId, 
          name: name,
          level: actualLevel, 
          type: type, 
          radius: Math.max(22 - actualLevel * 2, 10),
          details: {
            relationship: obj.relationship,
            tag_id: obj.tag_id,
            tag_description: obj.tag_description,
            min: obj.min_value,
            max: obj.max_value,
            path: obj.path,
            description: obj.document_description
          }
      });
      seenNodes.add(nodeId);
    }

    if (parentId) {
      links.push({ source: parentId, target: nodeId, label: obj.relationship || "CONTAINS" });
    }

    if (obj.children) {
      Object.entries(obj.children).forEach(([childName, childObj]) => {
        traverse(childName, childObj, nodeId, level + 1);
      });
    }
  };

  Object.entries(data).forEach(([rootName, rootObj]) => {
    traverse(rootName, rootObj);
  });

  return { nodes, links };
};

const KnowledgeGraph = () => {
  const [allData, setAllData] = useState({ nodes: [], links: [] });
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [selectedNode, setSelectedNode] = useState(null);
  
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const zoomRef = useRef(null);
  const simulationRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    
    const data = parseHierarchyToGraph(hierarchyData);
    setAllData(data);

    // Initial state: Start with empty expanded set so only the root node is visible
    setExpandedNodes(new Set());
  }, []);

  useEffect(() => {
    if (allData.nodes.length === 0) return;

    // Filter nodes: Visible if they are root OR their parent is expanded
    const visibleNodes = allData.nodes.filter(node => {
      if (node.level === 0) return true;
      // Find a link where this node is the target and the source is expanded
      const parentLink = allData.links.find(l => {
        const targetId = typeof l.target === 'object' ? l.target.id : l.target;
        const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
        return targetId === node.id && expandedNodes.has(sourceId);
      });
      return !!parentLink;
    });

    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

    // Filter links: Both source and target must be visible
    const visibleLinks = allData.links.filter(link => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;
      return visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
    });

    setGraphData({ nodes: visibleNodes, links: visibleLinks });
  }, [expandedNodes, allData]);

  useEffect(() => {
    if (!containerRef.current || graphData.nodes.length === 0) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    if (width === 0 || height === 0) return;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = d3.select(gRef.current);

    // Initialize zoom once
    if (!zoomRef.current) {
      const zoom = d3.zoom()
        .scaleExtent([0.1, 8])
        .extent([[0, 0], [width, height]])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        });
      zoomRef.current = zoom;
      svg.call(zoom);
    }

    // Initialize or restart simulation
    if (simulationRef.current) simulationRef.current.stop();

    const simulation = d3.forceSimulation(graphData.nodes)
      .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(140))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(d => d.radius + 18));
    
    simulationRef.current = simulation;

    // Rendering logic
    g.selectAll(".links-group, .nodes-group").remove();
    const linksGroup = g.append("g").attr("class", "links-group");
    const nodesGroup = g.append("g").attr("class", "nodes-group");

    const linkItem = linksGroup.selectAll(".link-group")
      .data(graphData.links)
      .enter().append("g")
      .attr("class", "link-group");

    const link = linkItem.append("line")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.6);

    const linkLabel = linkItem.append("text")
      .attr("class", "link-label")
      .attr("font-size", "7px")
      .attr("font-weight", 500)
      .attr("fill", "#94a3b8")
      .attr("text-anchor", "middle")
      .attr("dy", -5)
      .text(d => d.label);

    const node = nodesGroup.selectAll("g")
      .data(graphData.nodes)
      .enter().append("g")
      .attr("cursor", "pointer")
      .on("click", (event, d) => {
        setSelectedNode(d);
        // Toggle expansion on click
        setExpandedNodes(prev => {
          const next = new Set(prev);
          if (next.has(d.id)) {
            // Optional: If you want to collapse, remove it. 
            // But let's keep it expanded once clicked for better exploration.
            // next.delete(d.id); 
          } else {
            next.add(d.id);
          }
          return next;
        });

        // Center on click
        const t = d3.zoomTransform(svg.node());
        svg.transition().duration(750).call(
          zoomRef.current.transform,
          d3.zoomIdentity.translate(width / 2, height / 2).scale(t.k).translate(-d.x, -d.y)
        );
      })
      .call(d3.drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    node.append("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => levelColors[d.level] || "#94a3b8")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("filter", "drop-shadow(0 4px 6px rgba(0,0,0,0.1))");

    node.append("text")
      .text(d => d.name)
      .attr("x", d => d.radius + 5)
      .attr("y", 4)
      .attr("font-size", "10px")
      .attr("font-weight", 600)
      .attr("fill", "#64748b")
      .attr("class", "node-label")
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      linkLabel
        .attr("x", d => (d.source.x + d.target.x) / 2)
        .attr("y", d => (d.source.y + d.target.y) / 2)
        .attr("transform", d => {
            const x = (d.source.x + d.target.x) / 2;
            const y = (d.source.y + d.target.y) / 2;
            const angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x) * 180 / Math.PI;
            // Keep text upright
            const rotation = angle > 90 || angle < -90 ? angle + 180 : angle;
            return `rotate(${rotation}, ${x}, ${y})`;
        });

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [graphData]);

  const zoomIn = () => d3.select(svgRef.current).transition().call(zoomRef.current.scaleBy, 1.3);
  const zoomOut = () => d3.select(svgRef.current).transition().call(zoomRef.current.scaleBy, 0.7);
  const resetZoom = () => {
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    d3.select(svgRef.current).transition().call(zoomRef.current.transform, d3.zoomIdentity.translate(0,0).scale(1));
  };

  return (
    <div className="flex bg-slate-50 text-slate-900 h-[82vh] rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative">
      {/* Graph Section */}
      <div ref={containerRef} className="flex-1 relative bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] overflow-hidden">
        <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing">
          <g ref={gRef}></g>
        </svg>
        
        {/* Floating Tooltip/Header */}
        <div className="absolute top-6 left-6 z-10 p-5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 shadow-lg">
           <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
             <img src="/logo/domainwise_logo_preview.png" alt="DomainWise Logo" className="w-14 h-auto" />
             Knowledge <span className="text-blue-600">Graph</span>
           </h2>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-6 left-6 flex bg-white/90 backdrop-blur-md p-1.5 rounded-2xl gap-1 shadow-xl border border-slate-100">
            <button onClick={zoomIn} className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-600 hover:text-blue-600">
              <MagnifyingGlassPlusIcon className="h-5 w-5" />
            </button>
            <button onClick={zoomOut} className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-600 hover:text-blue-600">
              <MagnifyingGlassMinusIcon className="h-5 w-5" />
            </button>
            <button onClick={resetZoom} className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-600 hover:text-blue-600">
              <ArrowsPointingInIcon className="h-5 w-5" />
            </button>
        </div>
      </div>

      {/* Property Sidebar */}
      <div className="w-80 bg-white border-l border-slate-200 p-6 flex flex-col gap-6 shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
           <InformationCircleIcon className="w-5 h-5 text-blue-500" />
           <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Properties</h3>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          {selectedNode ? (
            <div className="space-y-6">
               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-blue-600 uppercase mb-1 block">Level {selectedNode.level}: {selectedNode.type}</span>
                  <h4 className="text-lg font-bold text-slate-900 leading-tight">{selectedNode.name}</h4>
               </div>

                 <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Details</p>
                  <div className="space-y-1">
                    <PropertyRow label="Type" value={selectedNode.type} />
                    {selectedNode.details?.tag_id && <PropertyRow label="Tag ID" value={selectedNode.details.tag_id} />}
                    {selectedNode.details?.tag_description && <PropertyRow label="Description" value={selectedNode.details.tag_description} />}
                    {selectedNode.details?.min !== undefined && <PropertyRow label="Min Value" value={selectedNode.details.min} />}
                    {selectedNode.details?.max !== undefined && <PropertyRow label="Max Value" value={selectedNode.details.max} />}
                    {selectedNode.details?.path && <PropertyRow label="Path" value={selectedNode.details.path} />}
                    {selectedNode.details?.description && <PropertyRow label="Doc Desc" value={selectedNode.details.description} />}
                  </div>
               </div>

               {/* Reference Documents Section Removed */}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-30">
               <RectangleGroupIcon className="w-16 h-16 text-slate-300 mb-4" />
               <p className="text-sm font-medium text-slate-500">Select a unit in the graph to inspect structural properties</p>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        .node-label {
          text-shadow: 0 1px 2px white, 0 0 5px white;
          opacity: 0.8;
          transition: opacity 0.3s;
        }
        g:hover .node-label {
          opacity: 1;
          fill: #2563eb;
        }
      `}</style>
    </div>
  );
};

const PropertyRow = ({ label, value }) => (
  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-50 hover:border-slate-200 transition-colors shadow-sm">
    <span className="text-xs font-semibold text-slate-400">{label}</span>
    <span className="text-xs font-bold text-slate-700">{value}</span>
  </div>
);

export default KnowledgeGraph;
