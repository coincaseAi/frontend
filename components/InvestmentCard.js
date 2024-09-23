'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign, Loader2 } from 'lucide-react';
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import caseAbi from '@/config/caseAbi.json';
import { parseEther } from 'viem';
import { toast } from 'sonner';
import { paymentTokens } from '@/constants/tokens';

export default function InvestmentCard({ isFirstTimeInvestor, minimumInvestment, caseId, paymentToken }) {

    const [token, setToken] = useState()
    useEffect(() => {
        setToken(paymentTokens.find(token => token?.address === paymentToken));
    }, [paymentToken]);
    const [investmentAmount, setInvestmentAmount] = useState('');
    const { address } = useAccount();

    const { data: hash, status, writeContractAsync } = useWriteContract();

    const handleInvest = async (e) => {
        e.preventDefault();
        if (investmentAmount <= 0) {
            toast.error("Please enter a valid investment amount");
            return;
        }
        if (investmentAmount < minimumInvestment) {
            toast.error("Investment amount must be greater than or equal to minimum investment");
            return;
        }

        try {
            const tx = await writeContractAsync({
                address: caseId,
                abi: caseAbi,
                functionName: 'buyTokens',
                args: [
                    parseEther(investmentAmount)
                ], // Add any necessary arguments here
                account: address,
                value: parseEther(investmentAmount) // Adjust the value as needed
            });
            console.log("Investment transaction:", tx);
            toast.success("Investment successful!");
            // Optionally, you can refetch the case details after a successful investment

        } catch (error) {
            console.log(error);
            toast.error(error.message.toString().split('.')[0]);
        }
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className='p-3 text-white bg-gradient-to-r from-blue-500 to-purple-500'>
                {isFirstTimeInvestor ? <> <CardTitle className='text-xl'>Start Your Investment Journey</CardTitle>
                    <p className="text-xs">Welcome! You're about to make your first investment in this case.</p></>
                    :
                    <> <CardTitle className='text-xl'>Invest more in this case</CardTitle>
                        <p className="text-xs">Invest more to get more returns.</p></>
                }
            </CardHeader>

            <CardContent className='p-3'>
                <div className="flex items-center gap-1">

                    <Input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        placeholder={`Min ${minimumInvestment} ${token?.symbol}`}
                    />
                    <Button onClick={handleInvest} size={status === 'pending' ? 'icon' : 'default'} disabled={status === 'pending'}>
                        {status === 'pending' ? <Loader2 className="w-4 h-4 animate-spin" /> : isFirstTimeInvestor ? "Invest Now" : "Invest More"}
                    </Button>
                </div>
            </CardContent>
        </Card>

    )
}

