'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Link from 'next/link';
import NumberTicker from '@/components/magicui/number-ticker';
import { Drawer, DrawerTrigger, DrawerPortal, DrawerOverlay, DrawerContent, DrawerTitle, DrawerClose, DrawerDescription } from '@/components/ui/drawer';
import { X } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

export default function PortfolioOverview({ cases }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}  >
                    <DrawerTrigger asChild>
                        <Card className="transition-colors cursor-pointer hover:bg-accent">
                            <CardHeader>
                                <CardTitle>Net Worth</CardTitle>
                            </CardHeader>
                            <CardContent className="">
                                $<NumberTicker className="text-3xl font-bold " value={totalValue} />
                                <span className={`text-base ml-2 font-normal ${totalReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {returnsPercentage}%
                                </span>
                            </CardContent>
                        </Card>
                    </DrawerTrigger>

                    <DrawerContent className="bg-background focus:ring-transparent flex flex-col max-w-md mx-auto rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
                        <div className="p-5 bg-background rounded-t-[10px] flex-1 overflow-y-auto">
                            <div className="flex items-center justify-center mb-4">
                                <DrawerTitle className="text-2xl font-bold">Portfolio Details</DrawerTitle>

                            </div>
                            <DrawerDescription className="sr-only">
                                Detailed breakdown of your portfolio, including net worth, total investment, returns, and profit.
                            </DrawerDescription>
                            <div className="max-w-md mx-auto">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Net Worth</p>
                                        <p className="text-xl font-bold">${totalValue.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Total Investment</p>
                                        <p className="text-xl font-bold">${totalInvested.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Returns</p>
                                        <p className={`text-xl font-bold ${totalReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {returnsPercentage}%
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Total Profit</p>
                                        <p className={`text-xl font-bold ${totalReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            ${totalReturns.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DrawerContent>

                </Drawer>
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
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Portfolio Breakdown</h3>

                    </div>

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
                                            <td className="py-2 text-right text-muted-foreground">${c.value.toLocaleString()}</td>
                                            <td className="py-2 text-right text-muted-foreground">${c.invested.toLocaleString()}</td>
                                            <td className={`py-2 text-right ${returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {returns.toFixed(2)}%
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}