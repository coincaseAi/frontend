import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import VolatilityBadge from './VolatilityBadge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { availableTokens } from '@/constants/tokens';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MyCoinCaseCard = ({ caseData }) => {
    console.log(caseData)
    const isPositive = caseData.performance[0].value <= caseData.performance[caseData.performance.length - 1].value;
    const lineData = {
        labels: caseData.performance.map(p => p.date),
        datasets: [{
            label: 'Performance',
            data: caseData.performance.map(p => p.value),
            fill: false,
            borderColor: isPositive ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
            tension: 0.4,
            pointRadius: 0,
        }]
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0
            }
        }
    };
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between p-2 space-y-0 border-b">
                <div className="flex items-center w-full gap-4">
                    <Avatar className="w-12 h-12 rounded">
                        <AvatarImage src={caseData.avatar} alt={caseData.name} className="rounded" />
                        <AvatarFallback className="rounded">{caseData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-2' >
                        <CardTitle >
                            <Link href={`case/${caseData.id}`} passHref>
                                {caseData.name}
                            </Link>
                        </CardTitle>
                        <CardDescription>{caseData.description}</CardDescription>
                    </div>
                    <div className="flex items-center w-20 h-10 ml-auto">
                        <Line data={lineData} options={lineOptions} />
                    </div>
                </div>

            </CardHeader>
            <CardContent className="p-3">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <span className="text-xs text-muted-foreground">Invested</span>
                        <p className="text-base font-medium">${caseData.invested?.toFixed(2)}</p>
                    </div>
                    <div>
                        <span className="text-xs text-muted-foreground">Value</span>
                        <p className="text-base font-medium">${caseData.value?.toFixed(2)}</p>
                    </div>
                    <div>
                        <span className="text-xs text-muted-foreground">Returns</span>
                        <p className={`text-base font-medium ${caseData.returns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {caseData.returns >= 0 ? '+' : ''}{caseData.returns?.toFixed(2)}%
                        </p>
                    </div>
                    <div>
                        <span className="text-xs text-muted-foreground">Volatility</span>
                        <VolatilityBadge volatility={caseData.volatility} />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between p-2">
                <div className="flex items-center space-x-1">
                    <div className='flex -space-x-2'>
                        {caseData.assets.slice(0, 3).map((asset, index) => {
                            const token = availableTokens.find(t => t.symbol === asset.currency);
                            return (
                                <Avatar key={index} className="w-6 h-6 bg-white border-2 border-background ">
                                    <AvatarImage src={token?.logoURI} alt={asset.currency} />
                                    <AvatarFallback>{asset.currency.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                            );
                        })}</div>
                    {caseData.assets.length > 3 && (
                        <div className="text-xs ">
                            +{caseData.assets.length - 3}
                        </div>
                    )}
                    <span className="pl-2 text-xs text-muted-foreground">
                        {caseData.assets.length} {caseData.assets.length === 1 ? 'asset' : 'assets'}
                    </span>
                </div>

            </CardFooter>
        </Card>
    );
};

export default MyCoinCaseCard;