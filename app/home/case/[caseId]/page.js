'use client';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CaseAssetTable from '@/components/CaseAssetTable';
import InvestmentCard from '@/components/InvestmentCard';
import SubscribeCard from '@/components/SubscribeCard'; // You'll need to create this component
import { useReadContract, useAccount } from 'wagmi';
import caseAbi from '@/config/caseAbi.json';
import { caseFactoryAddress } from '@/constants/mockData';
import abi from '@/config/abi.json';
import { Skeleton } from '@/components/ui/skeleton';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import EditCaseComponent from '@/components/EditCaseComponent';
import RebalanceCard from '@/components/RebalanceCard';
import WithdrawFundsButton from '@/components/WithdrawFundsButton';
import UpgradeToPublicButton from '@/components/UpgradeToPublicButton';
import GradientAvatar from '@/components/GradientAvatar';

export default function CaseDetails() {
    const router = useRouter();
    const params = useParams();
    const { address } = useAccount();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [totalInvestment, setTotalInvestment] = useState(null);
    const [prevWeights, setPrevWeights] = useState(null);
    const [data, setData] = useState(null);
    const [weightsChanged, setWeightsChanged] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const { data: caseData, isError, isLoading, isFetching, refetch } = useReadContract({
        address: params.caseId,
        abi: caseAbi,
        account: address,
        functionName: 'getCaseInfo',
    });

    const { data: caseHoldingWallet } = useReadContract({
        address: caseFactoryAddress,
        abi: abi,
        functionName: 'userWallets',
        args: [address],
    });

    const { data: subscriptionStatus } = useReadContract({
        address: params.caseId,
        abi: caseAbi,
        functionName: 'isSubscriptionActive',
        args: [address],
    });

    useEffect(() => {
        if (caseData && address) {
            const [caseName, caseOwner, tokens, weights, paymentToken, subscriptionsAmount, isPublic, subcriptionTime] = caseData;
            setData({ caseName, caseOwner, tokens, weights, isPublic, subcriptionTime, paymentToken });
            setIsCreator(caseOwner.toLowerCase() === address?.toLowerCase());
        }
    }, [caseData, address]);

    useEffect(() => {
        if (subscriptionStatus !== undefined) {
            setIsSubscribed(subscriptionStatus);
        }
    }, [subscriptionStatus]);

    useEffect(() => {
        if (prevWeights && data?.weights) {
            const isChanged = prevWeights.length !== data.weights.length ||
                prevWeights.some((weight, index) => weight !== data.weights[index]);
            setWeightsChanged(isChanged);
        }
    }, [prevWeights, data?.weights]);

    const closeDrawer = () => setIsDrawerOpen(false);

    if (isFetching) {
        return <div className="p-3 space-y-4">
            {/* ... (loading skeleton) ... */}
        </div>;
    }

    if (isError) return <div>Error loading case data</div>;
    if (!data) return <div>No data available</div>;

    return (
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
                        <div className="flex items-center w-full gap-2">
                            <span className="text-xl font-bold">{data.caseName}</span>
                            <Badge variant={data.isPublic ? "default" : "secondary"} className="ml-2">
                                {data.isPublic ? "Public" : "Private"}
                            </Badge>
                            {isCreator && (
                                <Button className='ml-auto' variant="ghost" size="icon" onClick={() => setIsDrawerOpen(true)}>
                                    <Pencil className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                        <div className="flex items-center gap-2 ">
                            <GradientAvatar address={data.caseOwner} size={40} />
                            <div className='flex flex-col'>
                                <span className="font-semibold text-l">{`${data.caseOwner.slice(0, 6)}...${data.caseOwner.slice(-4)}`}</span>
                                <span className='text-xs text-muted-foreground'>
                                    Creator of this case {isCreator ? "( You )" : ""}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-2'>
                    {(isCreator || isSubscribed) && (
                        <Card>
                            <CardHeader className='p-3'>
                                <CardTitle className=''>
                                    <span className='text-primary'>Total Investment</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='p-3 pt-0 text-2xl font-bold'>
                                ${totalInvestment ? `${Object.values(totalInvestment).reduce((acc, curr) => acc + curr, 0).toFixed(2)}` : 0}
                            </CardContent>
                        </Card>
                    )}

                    {
                        weightsChanged && totalInvestment ? (
                            <RebalanceCard caseId={params.caseId} caseWalletAddress={caseHoldingWallet} />
                        ) : (
                            isSubscribed || isCreator ? <InvestmentCard
                                isFirstTimeInvestor={!totalInvestment}
                                currentInvestment={totalInvestment}
                                minimumInvestment={1} // You might want to fetch this from the contract
                                caseId={params.caseId}
                                paymentToken={data.paymentToken}
                            /> : <SubscribeCard caseId={params.caseId} />
                        )
                    }
                </div>

                {(isCreator || isSubscribed) && (
                    <>
                        <div className='flex items-center justify-between'>
                            <h2 className="px-4 mt-4 mb-2 font-bold">Assets in this Case</h2>
                            <div className="space-x-2">
                                <WithdrawFundsButton
                                    caseId={params.caseId}
                                    caseWalletAddress={caseHoldingWallet}
                                />
                                {isCreator && !data.isPublic && (
                                    <UpgradeToPublicButton caseId={params.caseId} />
                                )}
                            </div>
                        </div>
                        <CaseAssetTable
                            weights={data.weights}
                            assets={data.tokens}
                            caseId={params.caseId}
                            setTotalInvestment={setTotalInvestment}
                            setPrevWeights={setPrevWeights}
                            caseHoldingWallet={caseHoldingWallet}
                            showDetails={isCreator || isSubscribed}
                        />
                    </>
                )}

                {!isCreator && !isSubscribed && (
                    <div className="mt-4">
                        <h2 className="px-4 mb-2 font-bold">Assets in this Case</h2>
                        <CaseAssetTable
                            isSubscribed={isSubscribed}
                            weights={data.weights}
                            assets={data.tokens}
                            caseId={params.caseId}
                            showDetails={isCreator || isSubscribed}
                        />
                    </div>
                )}
            </div>

            {isCreator && (
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerContent className="w-full max-w-md p-3 mx-auto">
                        <EditCaseComponent
                            caseId={params.caseId}
                            currentTokens={data.tokens}
                            currentWeights={data.weights}
                            onClose={closeDrawer}
                        />
                    </DrawerContent>
                </Drawer>
            )}
        </>
    );
}