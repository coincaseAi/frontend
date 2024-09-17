'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import CaseAssetTable from '@/components/CaseAssetTable';
import TransactionHistoryTable from '@/components/TransactionHistoryTable';
import SubscribeDrawer from '@/components/SubscribeDrawer';
import InvestmentCard from '@/components/InvestmentCard';
import VolatilityBadge from '@/components/VolatilityBadge';
import { useReadContract, useAccount, useWriteContract } from 'wagmi';
import caseAbi from '@/config/caseAbi.json';
import { Button } from '@/components/ui/button';
import { mockCases } from '@/constants/mockData';
import { EraserIcon } from 'lucide-react';

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56'];


export default function CaseDetails() {
    const params = useParams();
    const { address } = useAccount();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { data, isError, isLoading, isFetching, Error, refetch } = useReadContract({
        address: params.caseId,
        abi: caseAbi,
        account: address,
        functionName: 'getCaseInfo',
    });
    if (isFetching) return <div>Loading...</div>;
    if (isError) {
        console.log(Error)
        return <div>Error fetching case data</div>
    };

    if (!data) {
        return <div>Case not found

            <Button onClick={() => refetch()}>Refresh</Button>
        </div>;
    }
    const [caseName, caseOwner, tokens, weights, paymentToken, subscriptionFees, isPublic] = data;

    const isSubscribed = true
    const volatility = mockCases[0].volatility;
    const description = mockCases[0].description;
    const creator = mockCases[0].creator;
    const returns = mockCases[0].returns;
    const subscribers = mockCases[0].subscribers;
    const currentInvestment = mockCases[0].invested;
    const minimumInvestment = mockCases[0].minimumInvestment;


    const handleSubscribe = () => {
        console.log("subscribe");
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };




    return (
        <div className="container mx-auto ">
            <div className="flex flex-col items-start justify-between mb-6 md:flex-row">
                <div className="flex flex-col w-full gap-2">
                    <div className="flex items-center justify-between w-full gap-2 ">
                        <Link href={`/home/case-details/${params.caseId}`} className="text-3xl font-bold ">{caseName}</Link>
                        {/* {isSubscribed && (
                            <Badge variant="secondary" className="text-green-500 bg-green-500/20 hover:bg-green-600">
                                Subscribed
                            </Badge>
                        )} */}
                        {/* <VolatilityBadge volatility={volatility} /> */}
                        <Badge variant={isPublic ? "default" : "secondary"} className="ml-2">
                            {isPublic ? "Public" : "Private"}
                        </Badge>
                    </div>
                    {/* <p className="mb-4 text-lg">{description}</p> */}
                    <div className="flex items-center">
                        <Avatar className="w-12 h-12 mr-4">
                            <AvatarImage src={creator.avatar} alt={creator.name} />
                            <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                            <span className="font-semibold text-l">{`${caseOwner.slice(0, 6)}...${caseOwner.slice(-4)}`}</span>
                            <span className='text-xs text-muted-foreground'>
                                Creator of this case {caseOwner == address ? "( You ) " : ""}
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
                <Card>
                    <CardHeader className='p-3'>
                        <CardTitle className='text-xl'>
                            $10000
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className={` font-bold ${returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
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
                {isSubscribed ? (
                    <>

                        <div className="md:col-span-2">
                            <InvestmentCard
                                isFirstTimeInvestor={true}
                                currentInvestment={currentInvestment}
                                minimumInvestment={minimumInvestment}
                                caseId={params.caseId}
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
                                <span className="text-2xl font-bold">${minimumInvestment}</span>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Subscription Fee</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <span className="text-2xl font-bold">${0.001}</span>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Subscribe</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SubscribeDrawer caseData={params.caseId} onSubscribe={handleSubscribe} />
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>


            {isSubscribed && (
                <>
                    <h2 className="mt-8 mb-4 text-2xl font-bold">Assets in this Case</h2>
                    <CaseAssetTable weights={weights} assets={tokens} caseId={params.caseId} />

                    <h2 className="mt-8 mb-4 text-2xl font-bold">Transaction History</h2>
                    <TransactionHistoryTable />
                </>
            )}
        </div>
    );
}