'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { mockCases } from '@/constants/mockData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import CaseAssetTable from '@/components/CaseAssetTable';
import TransactionHistoryTable from '@/components/TransactionHistoryTable';
import SubscribeDrawer from '@/components/SubscribeDrawer';
import InvestmentCard from '@/components/InvestmentCard';
import VolatilityBadge from '@/components/VolatilityBadge';

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56'];


export default function CaseDetails() {
    const params = useParams();
    const [caseData, setCaseData] = useState(mockCases.find(c => c.id === params.caseId));

    if (!caseData) {
        return <div>Case not found</div>;
    }

    const handleSubscribe = (duration, amount) => {
        // In a real application, you would make an API call here
        // For now, we'll just update the local state
        setCaseData(prevData => ({
            ...prevData,
            isSubscribed: true,
            subscriptionDuration: duration,
            subscriptionAmount: amount
        }));
    };

    const { name, description, assets, returns, subscribers, creator, volatility, performance, minimumInvestment, subscriptionFee, isSubscribed, id } = caseData;
    const currentInvestment = caseData.value || 0;
    const isFirstTimeInvestor = currentInvestment === 0;

    const isPositive = performance[0].value <= performance[performance.length - 1].value;

    const allocationData = {
        labels: assets.map(asset => asset.currency),
        datasets: [{
            data: assets.map(asset => asset.weightage),
            backgroundColor: colors,
        }]
    };

    const performanceData = {
        labels: performance.map(p => p.date),
        datasets: [{
            label: 'Performance',
            data: performance.map(p => p.value),
            fill: false,
            borderColor: isPositive ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
            tension: 0.4,
            pointRadius: 0, // Remove points
        }]
    };

    const doughnutOptions = {
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

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false // Remove x-axis grid
                }
            },
            y: {
                grid: {
                    display: false // Remove y-axis grid
                }
            }
        },
        plugins: {
            legend: {
                display: false // Remove legend
            }
        },
        elements: {
            point: {
                radius: 0 // Ensure points are not displayed
            }
        }
    };

    return (
        <div className="container mx-auto ">
            <div className="flex flex-col items-start justify-between mb-6 md:flex-row">
                <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Link href={`/home/case-details/${id}`} className="text-3xl font-bold ">{name}</Link>
                        {isSubscribed && (
                            <Badge variant="secondary" className="text-green-500 bg-green-500/20 hover:bg-green-600">
                                Subscribed
                            </Badge>
                        )}
                        <VolatilityBadge volatility={volatility} />
                    </div>
                    <p className="mb-4 text-lg">{description}</p>
                </div>
                <div className="flex items-center">
                    <Avatar className="w-12 h-12 mr-4">
                        <AvatarImage src={creator.avatar} alt={creator.name} />
                        <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-lg">{creator.name}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Returns</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className={`text-2xl font-bold ${returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {returns >= 0 ? '+' : ''}{returns}%
                        </span>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Subscribers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold">{subscribers}</span>
                    </CardContent>
                </Card>   <Card>
                    <CardHeader>
                        <CardTitle>Your Investment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold">${currentInvestment.toLocaleString()}</span>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
                {caseData.isSubscribed ? (
                    <>

                        <div className="md:col-span-2">
                            <InvestmentCard
                                isFirstTimeInvestor={isFirstTimeInvestor}
                                currentInvestment={currentInvestment}
                                minimumInvestment={minimumInvestment}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Minimum Investment</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <span className="text-2xl font-bold">${caseData.minimumInvestment}</span>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Subscription Fee</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <span className="text-2xl font-bold">${caseData.subscriptionFee}</span>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Subscribe</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SubscribeDrawer caseData={caseData} onSubscribe={handleSubscribe} />
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>


            {isSubscribed && (
                <>
                    <h2 className="mt-8 mb-4 text-2xl font-bold">Assets in this Case</h2>
                    <CaseAssetTable assets={assets} />

                    <h2 className="mt-8 mb-4 text-2xl font-bold">Transaction History</h2>
                    <TransactionHistoryTable />
                </>
            )}
        </div>
    );
}