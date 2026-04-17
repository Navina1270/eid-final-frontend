'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });
import styles from './Gauge.module.css'
import { useTheme } from "@mui/material/styles";

const Gauge = ({ type, value, maxValue, unit, label }) => {
    const theme = useTheme();
    const [currentTheme, setCurrentTheme] = useState(theme.palette.mode);
    const [key, setKey] = useState(0);

    useEffect(() => {
        setCurrentTheme(theme.palette.mode);
        setKey(prevKey => prevKey + 1); 
    }, [theme.palette.mode]);

    const colour = currentTheme === "dark" ? "#fff" : "#000";

    const ticks = Array.from({ length: 5 }, (_, index) => ({
        value: (maxValue / 4) * index,
    }));
    const marginTop = type === 'semicircle' ? '-13px' : type === 'radial' ? '-30px' : '0';


    return (
        <div className={styles.container}>
            <div className={styles.graph} key={key}>
                <GaugeComponent
                    type={type}
                    arc={{
                        subArcs: ticks.map((tick, index) => ({
                            limit: tick.value,
                            showTick: true,
                        })),
                        colorArray: ['#00FF15', '#CE1F1F'],
                        gradient: true,
                        width: 0.15,
                        padding: 0,
                    }}
                    labels={{
                        valueLabel: {
                            formatTextValue: value => value + unit,
                            style: {
                                fill: colour,
                                textShadow: "none"
                            }
                        },
                        tickLabels: {
                            type: "inner",
                            defaultTickValueConfig: {
                                formatTextValue: value => value + unit,
                                style: { fill: colour,}
                            },
                            defaultTickLineConfig: { color: colour, }
                        },
                    }}
                    value={value}
                    maxValue={maxValue}
                    pointer={{
                        color: "#adacab",
                        width: 10
                    }}
                />
            </div>
            <div className={styles.label} style={{ marginTop }} >
                {label}
            </div>
        </div>

    );
};

export default Gauge;
