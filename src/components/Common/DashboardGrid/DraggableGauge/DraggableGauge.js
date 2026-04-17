"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import styles from "./Gauge.module.css";

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

const DraggableGauge = ({
  type = "radial",
  value,
  maxValue,
  unit = "",
  label,
}) => {
  const theme = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme.palette.mode);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setCurrentTheme(theme.palette.mode);
    setKey((prev) => prev + 1);
  }, [theme.palette.mode]);

  const colour = currentTheme === "dark" ? "#fff" : "#000";

  /**
   * Smooth gradient:
   *  - start: green
   *  - middle: yellow
   *  - end: red
   * react-gauge-component lets us pass an array of colors for a
   * continuous gradient.
   */
  const arcConfig = {
    colorArray: ["#00c851", "#ffeb3b", "#ff4444"], // green → yellow → red
    gradient: true,
    width: 0.2, // slightly thicker for a smoother look
    padding: 0,
    subArcs: Array.from({ length: 6 }, (_, i) => ({
      limit: (maxValue / 5) * i,
      showTick: true,
      tick: {
        // soft tick lines for a clean appearance
        lineColor: colour,
        lineLength: 4,
        lineWidth: 1,
      },
    })),
  };

  const labelConfig = {
    valueLabel: {
      formatTextValue: (v) => `${v}${unit}`,
      style: {
        fill: colour,
        fontWeight: "bold",
        textShadow: "none",
      },
    },
    tickLabels: {
      type: "inner",
      defaultTickValueConfig: {
        formatTextValue: (v) => `${v}${unit}`,
        style: { fill: colour, fontSize: 12 },
      },
      defaultTickLineConfig: { color: colour },
    },
  };

  const marginTop =
    type === "semicircle" ? "-15px" : type === "radial" ? "0px" : "0";

  return (
    <div className={styles.container}>
      <div className={styles.graph} key={key}>
        <GaugeComponent
          type={type}
          value={value}
          maxValue={maxValue}
          arc={arcConfig}
          labels={labelConfig}
          pointer={{
            color: "#9e9e9e",
            length: 0.6,
            width: 8,
            elastic: true, // subtle spring motion
          }}
          animateDuration={1200} // smooth sweep animation
        />
      </div>
      <div
        className={styles.label}
        style={{ marginTop, color: colour, fontWeight: "600" }}
      >
        {label}
      </div>
    </div>
  );
};

export default DraggableGauge;
