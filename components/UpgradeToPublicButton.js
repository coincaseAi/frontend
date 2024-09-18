import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import caseAbi from '@/config/caseAbi.json';
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

const UpgradeToPublicButton = ({ caseId }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { writeContractAsync, isPending } = useWriteContract();

    const handleUpgrade = async () => {
        try {
            const tx = await writeContractAsync({
                address: caseId,
                abi: caseAbi,
                functionName: 'upgradeToPublic',
            });

            toast.promise(tx.wait(), {
                loading: 'Upgrading case to public...',
                success: 'Case upgraded to public successfully',
                error: 'Failed to upgrade case to public',
            });

            setIsDrawerOpen(false);
        } catch (error) {
            console.error('Upgrade error:', error);
            toast.error(error.message || "An error occurred during the upgrade");
        }
    };

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