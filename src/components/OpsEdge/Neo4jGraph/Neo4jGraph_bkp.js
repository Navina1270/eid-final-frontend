"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import neo4j from "neo4j-driver";
import Grid from '@mui/material/Grid2';
import Chatbot from "@/components/Common/Chatbot/Chatbot";

const ForceGraph2D = dynamic(() => import("react-force-graph").then(mod => mod.ForceGraph2D), { ssr: false });

const Neo4jGraph = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loadedNodes, setLoadedNodes] = useState(new Set()); // To track loaded nodes

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("aframe");
    }

    const driver = neo4j.driver(
      "neo4j://15.206.238.170:7687",
      neo4j.auth.basic("neo4j", "Neo4j@123")
    );

    const session = driver.session();

    // Load base nodes initially
    session
      .run("MATCH (n) RETURN n LIMIT 1") // Start with one base node
      .then((result) => {
        const nodes = [];
        result.records.forEach((record) => {
          const node = record.get("n");
          nodes.push({ id: node.identity.low, ...node.properties });
        });
        setGraphData({ nodes, links: [] });
      })
      .finally(() => session.close());
  }, []);

  // Function to load sub-nodes on click
  const handleNodeClick = (node) => {
    if (loadedNodes.has(node.id)) return; // Skip if already loaded

    const driver = neo4j.driver(
      "neo4j://15.206.238.170:7687",
      neo4j.auth.basic("neo4j", "Neo4j@123")
    );
    const session = driver.session();

    session
      .run(
        "MATCH (n)-[r]->(m) WHERE id(n) = $nodeId RETURN n, r, m",
        { nodeId: neo4j.int(node.id) }
      )
      .then((result) => {
        const nodes = new Map(graphData.nodes.map(n => [n.id, n]));
        const links = [...graphData.links];

        result.records.forEach((record) => {
          const node1 = record.get("n");
          const node2 = record.get("m");
          const relationship = record.get("r");

          nodes.set(node2.identity.low, { id: node2.identity.low, ...node2.properties });

          links.push({
            source: node1.identity.low,
            target: node2.identity.low,
            name: relationship.type
          });
        });

        setGraphData({
          nodes: Array.from(nodes.values()),
          links: links
        });

        setLoadedNodes(prev => new Set(prev).add(node.id)); // Mark node as loaded
      })
      .finally(() => session.close());
  };

  return (
    // <div style={{Height:"300px",width:"300px"}}>
    <Grid container spacing={2}>
    <Chatbot />
    <Grid size={{ xs: 12, md: 6 }}>
    <ForceGraph2D
      graphData={graphData}
      nodeAutoColorBy="id"
      linkDirectionalArrowLength={5}
      linkDirectionalArrowRelPos={1}
      nodeLabel={(node) => node.name || node.Description || node.Heat_Exchanger_ID || "Unnamed"}
      onNodeClick={handleNodeClick}
      />

    </Grid>
    {/* <Grid size={{ xs: 2, md: 2 }}>
asasasdasda
</Grid> */}
  </Grid>


      // </div>
  );
};

export default Neo4jGraph;
