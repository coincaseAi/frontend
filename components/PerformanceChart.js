'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function PerformanceChart({ performance }) {
    const isPositive = performance[0].value <= performance[performance.length - 1].value;

    const data = {
        labels: performance.map(p => p.date),
        datasets: [{
            label: 'Performance',
            data: performance.map(p => p.value),
            fill: false,
            borderColor: isPositive ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
            tension: 0.4,
            pointRadius: 0,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        elements: {
            point: {
                radius: 0
            }
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <Line data={data} options={options} />
                </div>
            </CardContent>
        </Card>
    );
}