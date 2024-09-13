'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Link from 'next/link';
ChartJS.register(ArcElement, Tooltip, Legend);

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

export default function PortfolioOverview({ cases }) {
    const totalValue = cases.reduce((sum, c) => sum + c.value, 0);
    const totalInvested = cases.reduce((sum, c) => sum + c.invested, 0);
    const totalReturns = totalValue - totalInvested;
    const returnsPercentage = ((totalReturns / totalInvested) * 100).toFixed(2);

    const data = {
        labels: cases.map(c => c.name),
        datasets: [{
            data: cases.map(c => c.value),
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
                borderWidth: 0  // This removes the border from the donut segments
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Portfolio Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">${totalValue.toLocaleString()}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Invested Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">${totalInvested.toLocaleString()}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Returns</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-3xl font-bold ${totalReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${totalReturns.toLocaleString()} ({returnsPercentage}%)
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Portfolio Allocation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <Doughnut data={data} options={options} />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Portfolio Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto text-xs lg:text-sm">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2 text-left">Cases
                                            <span className="ml-2 text-muted-foreground">
                                                {cases.length}
                                            </span>
                                        </th>
                                        <th className="py-2 text-right">Current</th>
                                        <th className="py-2 text-right">Invested</th>
                                        <th className="py-2 text-right">Returns</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cases.map((c, index) => {
                                        const returns = ((c.value - c.invested) / c.invested) * 100;
                                        return (
                                            <tr key={c.id} className="border-b last:border-b-0">
                                                <td className="py-2">
                                                    <span className="flex items-center">
                                                        <span className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}></span>
                                                        <Link href={`/home/case/${c.id}`} className="hover:underline">{c.name}</Link>
                                                    </span>
                                                </td>
                                                <td className="py-2 text-right">${c.value.toLocaleString()}</td>
                                                <td className="py-2 text-right">${c.invested.toLocaleString()}</td>
                                                <td className={`py-2 text-right ${returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {returns.toFixed(2)}%
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}