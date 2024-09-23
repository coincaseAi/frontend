import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useWriteContract, useWaitForTransactionReceipt, useConfig, useReadContract } from 'wagmi';
import caseAbi from '@/config/caseAbi.json';
import abi from '@/config/abi.json';
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
import { caseFactoryAddress } from '@/constants/mockData';

const UpgradeToPublicButton = ({ caseId }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { writeContractAsync, isPending, status } = useWriteContract();
    const { data: creationFee, isLoading: isCreationFeeLoading } = useReadContract({
        address: caseFactoryAddress,
        abi: abi,
        functionName: 'getCreationFee',
    });

    const handleUpgrade = async () => {
        try {
            console.log(creationFee)

            const tx = await writeContractAsync({
                address: caseId,
                abi: caseAbi,
                functionName: 'upgradeToPublic',
                args: [

                ],
                value: creationFee
            });



            setIsDrawerOpen(false);
        } catch (error) {
            console.error('Upgrade error:', error);
            toast.error(error.message || "An error occurred during the upgrade");
        }
    };
    useEffect(() => {
        if (status === 'success') {
            toast.success('Case upgraded to public successfully');
        } else if (status === 'error') {
            toast.error('Failed to upgrade case to public');
        }
    }, [status]);
    return (
        <>
            <Button size="sm" variant="outline" onClick={() => setIsDrawerOpen(true)}>
                Upgrade to Public
            </Button>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="max-w-md mx-auto">
                    <DrawerHeader>
                        <DrawerTitle>Confirm Upgrade to Public</DrawerTitle>
                        <DrawerDescription>
                            Are you sure you want to upgrade this case to public? This action cannot be undone.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button onClick={handleUpgrade} disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Upgrading...
                                </>
                            ) : (
                                'Confirm Upgrade'
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

export default UpgradeToPublicButton;