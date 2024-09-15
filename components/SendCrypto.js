'use client';
import React, { useState } from 'react';
import {
    useSendTransaction,
    useWaitForTransactionReceipt
} from 'wagmi';
import { parseEther } from 'viem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { Loader2 } from 'lucide-react';

export const SendCrypto = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState('');

    const {
        data: hash,
        error,
        isPending,
        sendTransaction
    } = useSendTransaction();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const to = formData.get('address');
        const value = formData.get('value');
        sendTransaction({ to, value: parseEther(value) });
        setIsDrawerOpen(true);
        setTransactionStatus('Pending');
    };

    React.useEffect(() => {
        if (isPending) setTransactionStatus('Pending');
        if (isConfirming) setTransactionStatus('Confirming');
        if (isConfirmed) setTransactionStatus('Confirmed');
        if (error) setTransactionStatus('Error');
    }, [isPending, isConfirming, isConfirmed, error]);

    return (
        <>
            <form onSubmit={submit} className="space-y-4">
                <Input name="address" placeholder="0xA0Cf…251e" required />
                <Input name="value" placeholder="0.05" type="number" step="0.000000000000000001" required />
                <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full"
                >
                    {isPending ? 'Confirming...' : 'Send'}
                </Button>
            </form>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Transaction Status</DrawerTitle>
                        <DrawerDescription>
                            {transactionStatus === 'Pending' && (
                                <div className="flex items-center">
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Transaction is pending...
                                </div>
                            )}
                            {transactionStatus === 'Confirming' && (
                                <div className="flex items-center">
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Waiting for confirmation...
                                </div>
                            )}
                            {transactionStatus === 'Confirmed' && (
                                <div>
                                    Transaction confirmed!
                                    {hash && (
                                        <div className="mt-2">
                                            <p className="font-semibold">Transaction Hash:</p>
                                            <p className="break-all">{hash}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                            {transactionStatus === 'Error' && (
                                <div className="text-red-500">
                                    Error: {error?.shortMessage || error?.message}
                                </div>
                            )}
                        </DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        </>
    );
}