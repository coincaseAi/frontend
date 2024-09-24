import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import caseWalletAbi from '@/config/caseWalletAbi.json';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

const WithdrawFundsButton = ({ caseId, caseWalletAddress }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { writeContractAsync, isPending, isSuccess, isError, error } = useWriteContract();

    const handleWithdraw = async () => {
        try {
            const tx = await writeContractAsync({
                address: caseWalletAddress,
                abi: caseWalletAbi,
                functionName: 'withdrawFromCase',
                args: [caseId],
            });


            setIsDrawerOpen(false);
        } catch (error) {
            console.error('Withdrawal error:', error);
            toast.error(error.message || "An error occurred during withdrawal");
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Funds withdrawn successfully');
        }
        if (isError) {
            toast.error(error.message || "An error occurred during withdrawal");
        }
    }, [isSuccess, isError, error]);

    return (
        <>
            <Button size="sm" variant="outline" onClick={() => setIsDrawerOpen(true)}>
                Withdraw Funds
            </Button>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="max-w-md mx-auto">
                    <DrawerHeader>
                        <DrawerTitle>Confirm Withdrawal</DrawerTitle>
                        <DrawerDescription>
                            Are you sure you want to withdraw all funds from this case?
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button onClick={handleWithdraw} disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Withdrawing...
                                </>
                            ) : (
                                'Confirm Withdrawal'
                            )}
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default WithdrawFundsButton;