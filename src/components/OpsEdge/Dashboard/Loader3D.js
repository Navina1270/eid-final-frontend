import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

const starCount = 300;
const nodeCount = 6;
const radius = 4;

const nodes = Array.from({ length: nodeCount }, (_, i) => {
  const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount);
  const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
  return {
    id: i + 1,
    position: [
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi),
    ],
  };
});

const longTexts = [
  "Analyzing the entire input stream and optimizing the AI model for maximum efficiency and performance.",
  "Fetching multiple data streams from various sources to synchronize neural pathways and generate accurate outputs.",
  "Initializing core AI algorithms, synthesizing complex responses, and loading essential modules seamlessly.",
  "Processing the extensive knowledge base with deep learning to evaluate context and derive meaningful insights.",
  "Maintaining signal stability while ensuring smooth receipt of data packets and minimizing network latency.",
  "Queuing agent responses efficiently, finalizing outputs, and preparing detailed results for delivery.",
];

function computeLineDistances(geometry) {
  const position = geometry.attributes.position;
  const lineDistances = new Float32Array(position.count);
  let distance = 0;
  lineDistances[0] = 0;
  const tmpA = new THREE.Vector3();
  const tmpB = new THREE.Vector3();
  for (let i = 1; i < position.count; i++) {
    tmpA.fromBufferAttribute(position, i - 1);
    tmpB.fromBufferAttribute(position, i);
    distance += tmpA.distanceTo(tmpB);
    lineDistances[i] = distance;
  }
  geometry.setAttribute("lineDistance", new THREE.BufferAttribute(lineDistances, 1));
}

export default function Loader3D() {
  const mountRef = useRef(null);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const currentNodeRef = useRef(0);

  useEffect(() => {
    currentNodeRef.current = currentNodeIndex;
  }, [currentNodeIndex]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(mount.clientWidth, mount.clientHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.inset = "0";
    labelRenderer.domElement.style.pointerEvents = "none";

    mount.appendChild(renderer.domElement);
    mount.appendChild(labelRenderer.domElement);

    const ambient = new THREE.AmbientLight(0x00ffcc, 0.2);
    scene.add(ambient);
    const point = new THREE.PointLight(0x00ffcc, 1);
    point.position.set(10, 10, 10);
    scene.add(point);

    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 30;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x00ffcc, size: 0.1, sizeAttenuation: true });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const nodeGroups = [];
    const nodeLabels = [];

    const labelStyle = {
      color: "#e0f7fa",
      fontWeight: "700",
      fontFamily: "'Roboto Mono', monospace",
      fontSize: "12px",
      whiteSpace: "normal",
      width: "350px",
      backgroundColor: "rgba(0, 255, 204, 0.2)",
      padding: "8px 12px",
      borderRadius: "6px",
      border: "1px solid rgba(0, 255, 204, 0.4)",
      textShadow: "0 0 5px rgba(0, 0, 0, 0.7)",
      userSelect: "none",
      fontVariantNumeric: "tabular-nums",
    };

    nodes.forEach((node, i) => {
      const group = new THREE.Group();
      group.position.set(node.position[0], node.position[1], node.position[2]);

      const sphereGeo = new THREE.SphereGeometry(0.25, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: i === currentNodeRef.current ? 0xff3366 : 0x00ffcc,
        emissive: i === currentNodeRef.current ? 0xff3366 : 0x00ffcc,
        emissiveIntensity: 1,
        roughness: 0.1,
        metalness: 0.9,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      group.add(sphere);

      const el = document.createElement("div");
      Object.assign(el.style, labelStyle);
      el.textContent = longTexts[i];
      const label = new CSS2DObject(el);
      label.position.set(0, 0.6, 0);
      group.add(label);

      scene.add(group);

      nodeGroups.push({ group, sphere, sphereMat, baseX: node.position[0] });
      nodeLabels.push(label);
    });

    const lineMaterials = [];
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i].position;
      const b = nodes[(i + 1) % nodes.length].position;
      const points = [new THREE.Vector3(...a), new THREE.Vector3(...b)];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      computeLineDistances(geometry);

      const mat = new THREE.LineDashedMaterial({
        color: 0x00ffcc,
        linewidth: 1,
        dashSize: 0.3,
        gapSize: 0.2,
        transparent: true,
        opacity: 0.7,
      });

      const line = new THREE.Line(geometry, mat);
      line.computeLineDistances();
      scene.add(line);
      lineMaterials.push(mat);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.zoomSpeed = 0.5;
    controls.panSpeed = 0.5;
    controls.rotateSpeed = 0.4;

    const onResize = () => {
      const { clientWidth, clientHeight } = mount;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
      labelRenderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener("resize", onResize);

    const intervalId = setInterval(() => {
      setCurrentNodeIndex((i) => (i + 1) % nodes.length);
    }, 5000);

    const clock = new THREE.Clock();
    let rafId = 0;
    const animate = () => {
      const t = clock.getElapsedTime();

      stars.rotation.y += 0.0007;

      for (let i = 0; i < nodeGroups.length; i++) {
        const { group, baseX, sphereMat } = nodeGroups[i];
        const scale = 1 + 0.15 * Math.sin(t * 2 + baseX);
        group.scale.set(scale, scale, scale);
        nodeLabels[i].visible = i === currentNodeRef.current;
        if (i === currentNodeRef.current) {
          sphereMat.color.set(0xff3366);
          sphereMat.emissive.set(0xff3366);
        } else {
          sphereMat.color.set(0x00ffcc);
          sphereMat.emissive.set(0x00ffcc);
        }
      }

      for (let i = 0; i < lineMaterials.length; i++) {
        if ("dashOffset" in lineMaterials[i]) {
          lineMaterials[i].dashOffset -= 0.015;
        }
      }

      controls.update();
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);
      window.removeEventListener("resize", onResize);
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose?.();
          obj.material?.dispose?.();
        }
        if (obj.isLine) {
          obj.geometry?.dispose?.();
          obj.material?.dispose?.();
        }
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      labelRenderer.dispose?.();
      if (labelRenderer.domElement.parentNode === mount) {
        mount.removeChild(labelRenderer.domElement);
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />
      <div
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          textAlign: "center",
          color: "#00ffcc",
          fontFamily: "'Roboto Mono', monospace",
          fontSize: 18,
          userSelect: "none",
          textShadow: "0 0 10px #00ffcc",
          pointerEvents: "none",
        }}
      >
        Loading AI Agent... Please wait
      </div>
    </div>
  );
}
