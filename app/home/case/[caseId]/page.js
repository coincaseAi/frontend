'use client';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
import { caseFactoryAddress, mockCases } from '@/constants/mockData';
import abi from '@/config/abi.json';
import { Skeleton } from '@/components/ui/skeleton';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import EditCaseComponent from '@/components/EditCaseComponent';
import RebalanceCard from '@/components/RebalanceCard';



export default function CaseDetails() {
    const router = useRouter();
    const params = useParams();
    const { address } = useAccount();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [totalInvestment, setTotalInvestment] = useState(null);
    const [prevWeights, setPrevWeights] = useState(null);
    const [data, setData] = useState(null);
    const [weightsChanged, setWeightsChanged] = useState(false);
    const { data: caseData, isError, isLoading, isFetching, Error, refetch } = useReadContract({
        address: params.caseId,
        abi: caseAbi,
        account: address,
        functionName: 'getCaseInfo',
    });
    const { data: caseHoldingWallet, isError: isCaseHoldingWalletError, isLoading: isCaseHoldingWalletLoading, Error: caseHoldingWalletError } = useReadContract({
        address: caseFactoryAddress,
        abi: abi,
        functionName: 'userWallets',
        args: [address],

    });
    useEffect(() => {
        if (caseData) {
            console.log(caseData)
            const [caseName, caseOwner, tokens, weights, paymentToken, subscriptionsAmount, isPublic, invested] = caseData;
            setData({ caseName: caseName, caseOwner: caseOwner, tokens: tokens, weights: weights, isPublic: isPublic, invested: invested, paymentToken: paymentToken });
        }
    }, [caseData]);

    useEffect(() => {
        if (prevWeights && data?.weights) {
            const isChanged = prevWeights.length !== data.weights.length ||
                prevWeights.some((weight, index) => weight !== data.weights[index]);
            console.log('Weights changed:', isChanged);
            setWeightsChanged(isChanged);
        }
    }, [prevWeights, data?.weights])

    const isSubscribed = true
    const volatility = mockCases[0].volatility;
    const description = mockCases[0].description;
    const creator = mockCases[0].creator;
    const returns = mockCases[0].returns;
    const subscribers = mockCases[0].subscribers;
    const currentInvestment = mockCases[0].invested;
    const minimumInvestment = 1;


    const handleSubscribe = () => {
        console.log("subscribe");
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        isFetching ? <div className="p-3 space-y-4">
            <div className="flex items-center justify-between ">
                <Skeleton className="w-1/3 h-8" />
                <Skeleton className="w-20 h-6" />
            </div>
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-2/3 h-4" />
            <div className="flex items-center space-x-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Skeleton className="w-full h-24" />
                <Skeleton className="w-full h-24" />
            </div>
            <Skeleton className="h-[200px] w-full" />
        </div>
            :
            isError ? <div>Error</div> :
                !data ? <div>No data</div> :
                    <>

                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                            className="flex items-center -ml-3"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2 -ml-2" />
                            Back
                        </Button>

                        <div className="container mx-auto">
                            <div className="flex flex-col items-start justify-between mb-6 md:flex-row">
                                <div className="flex flex-col w-full gap-2">
                                    <div className="flex items-center w-full gap-2 ">
                                        <span className="text-xl font-bold ">{data.caseName}</span>
                                        <Badge variant={data.isPublic ? "default" : "secondary"} className="ml-2">
                                            {data.isPublic ? "Public" : "Private"}
                                        </Badge>
                                        <Button className='ml-auto' variant="ghost" size="icon" onClick={() => setIsDrawerOpen(true)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        {/* {isSubscribed && (
                            <Badge variant="secondary" className="text-green-500 bg-green-500/20 hover:bg-green-600">
                                Subscribed
                            </Badge>
                        )} */}
                                        {/* <VolatilityBadge volatility={volatility} /> */}

                                    </div>
                                    {/* <p className="mb-4 text-lg">{description}</p> */}
                                    <div className="flex items-center">
                                        <Avatar className="w-12 h-12 mr-4">
                                            <AvatarImage src={creator.avatar} alt={creator.name} />
                                            <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className='flex flex-col'>
                                            <span className="font-semibold text-l">{`${data.caseOwner.slice(0, 6)}...${data.caseOwner.slice(-4)}`}</span>
                                            <span className='text-xs text-muted-foreground'>
                                                Creator of this case {data.caseOwner == address ? "( You ) " : ""}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='grid grid-cols-1 gap-4 mb-2 md:grid-cols-2'>
                                <Card>
                                    <CardHeader className='p-3'>
                                        <CardTitle className=''>
                                            <span className='text-primary'>Total Investment</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className='p-3 pt-0 text-2xl font-bold'>
                                        {/* <span className={`text-sm font-semibold ${returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {returns >= 0 ? '+' : ''}{returns}%
                        </span> */}
                                        ${totalInvestment ? `${Object.values(totalInvestment).reduce((acc, curr) => acc + curr, 0).toFixed(2)}` : 0}

                                    </CardContent>
                                </Card>

                                {isSubscribed ? (
                                    weightsChanged && totalInvestment ? <RebalanceCard caseId={params.caseId} caseWalletAddress={caseHoldingWallet} /> :
                                        <InvestmentCard
                                            isFirstTimeInvestor={!totalInvestment}
                                            currentInvestment={currentInvestment}
                                            minimumInvestment={minimumInvestment}
                                            caseId={params.caseId}
                                            paymentToken={data.paymentToken}
                                        />
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
                                    <h2 className="px-4 mt-4 mb-2 font-bold ">Assets in this Case</h2>
                                    <CaseAssetTable weights={data.weights} assets={data.tokens} caseId={params.caseId} setTotalInvestment={setTotalInvestment} setPrevWeights={setPrevWeights} caseHoldingWallet={caseHoldingWallet} />

                                    {/* <h2 className="mt-8 mb-4 text-xl font-bold">Transaction History</h2> */}
                                    {/* <TransactionHistoryTable caseId={params.caseId} /> */}
                                    {/* <FetchLogs caseId={params.caseId} /> */}
                                </>
                            )}
                        </div>
                        <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                            <DrawerContent className="w-full max-w-lg p-3 mx-auto">
                                <EditCaseComponent
                                    caseId={params.caseId}
                                    currentTokens={data.tokens}
                                    currentWeights={data.weights}
                                    onClose={closeDrawer}
                                />
                            </DrawerContent>
                        </Drawer>
                    </>
    );
}