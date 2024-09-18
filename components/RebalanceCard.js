import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import caseWalletAbi from '@/config/caseWalletAbi.json';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const RebalanceCard = ({ caseId, caseWalletAddress }) => {

    const { status, writeContractAsync } = useWriteContract();

    const handleRebalance = async () => {

        try {
            const tx = await writeContractAsync({
                address: caseWalletAddress,
                abi: caseWalletAbi,
                functionName: 'rebalance',
                args: [caseId],
            });

            const receipt = await tx.wait();
            if (receipt.status === 1) {
                toast.success("Rebalance successful");
            } else {
                toast.error("Rebalance failed");
            }
        } catch (error) {
            console.error('Rebalance error:', error);
            toast.error(error.message || "An error occurred during rebalancing");
        }
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className='p-3 text-white bg-gradient-to-r from-blue-500 to-purple-500'>
                <CardTitle className='text-xl'>Rebalance Case</CardTitle>

            </CardHeader>
            <CardContent className='p-3 space-y-2'> <p className="text-sm text-center">Rebalance your case to maintain the target allocation of assets.</p>
                <Button
                    onClick={handleRebalance}
                    disabled={status === 'pending'}
                    className="w-full"
                >
                    {status === 'pending' ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Rebalancing...
                        </>
                    ) : (
                        'Rebalance'
                    )}
                </Button>
            </CardContent>
        </Card>
    );
};

export default RebalanceCard;