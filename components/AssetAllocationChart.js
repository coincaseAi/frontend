'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale } from 'chart.js';
import { colors } from '@/constants/mockData';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

export default function AssetAllocationChart({ assets }) {
    const data = {
        labels: assets.map(asset => asset.currency),
        datasets: [{
            data: assets.map(asset => asset.weightage),
            backgroundColor: colors,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        cutout: '70%',
        elements: {
            arc: {
                borderWidth: 0
            }
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] ">
                    <Doughnut data={data} options={options} />
                </div>
            </CardContent>
        </Card>
    );
}