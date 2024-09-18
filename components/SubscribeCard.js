import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWriteContract } from 'wagmi';
import caseAbi from '@/config/caseAbi.json';
import { toast } from 'sonner';

const SubscribeCard = ({ caseId }) => {
    const { writeContractAsync, isPending } = useWriteContract();

    const handleSubscribe = async () => {
        try {
            await writeContractAsync({
                address: caseId,
                abi: caseAbi,
                functionName: 'subscribe',
                // Add any necessary arguments here
            });
            toast.success("Successfully subscribed to the case");
        } catch (error) {
            console.error('Subscription error:', error);
            toast.error(error.message || "An error occurred during subscription");
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Subscribe to this Case</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4">Subscribe to access detailed information and invest in this case.</p>
                <Button onClick={handleSubscribe} disabled={isPending}>
                    {isPending ? 'Subscribing...' : 'Subscribe'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default SubscribeCard;