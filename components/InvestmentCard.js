'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign } from 'lucide-react';
import { useWriteContract, useAccount } from 'wagmi';
import caseAbi from '@/config/caseAbi.json';
import { parseEther } from 'viem';
import { toast } from 'sonner';

export default function InvestmentCard({ isFirstTimeInvestor, currentInvestment, minimumInvestment, caseId }) {

    const [investmentAmount, setInvestmentAmount] = useState(0);
    const { address } = useAccount();

    const { writeContractAsync } = useWriteContract();

    const handleInvest = async (e) => {
        e.preventDefault();
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
            console.log("Error investing:", error);
            toast.error("Investment failed: " + error.message);
        }
    };
    if (isFirstTimeInvestor) {
        return (
            <Card className="text-white bg-gradient-to-r from-blue-500 to-purple-500">
                <CardHeader>
                    <CardTitle>Start Your Investment Journey</CardTitle>
                    <p className="text-xs">Welcome! You're about to make your first investment in this case.</p>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2">

                        <Input
                            type="number"
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(e.target.value)}
                            placeholder={`Min $${minimumInvestment}`}
                            className="flex-grow p-2 text-black bg-white border rounded"
                        />
                        <Button size="lg" onClick={handleInvest}>
                            Invest Now
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    } else {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between">
                            Invest More <span className="text-muted-foreground">${minimumInvestment} minimum amount</span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center">
                    <Input
                        type="number"
                        placeholder="Enter amount"
                        className="flex-grow p-2 mr-4 border rounded"
                    />
                    <Button size="lg">
                        Invest
                    </Button>
                </CardContent>
            </Card>
        );
    }
}