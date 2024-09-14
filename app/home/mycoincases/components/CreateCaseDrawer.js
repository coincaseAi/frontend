'use client';

import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import CreateCase from '@/components/CreateCase'; // Update this import

export function CreateCaseDrawer({ isOpen, onClose }) {
    return (
        <Drawer open={isOpen} onClose={onClose}>
            <DrawerContent className="h-[90dvh] max-w-md mx-auto">
                <DrawerHeader className="flex items-center justify-between">
                    <DrawerTitle className='text-2xl font-bold'>Create New Case</DrawerTitle>
                    <DrawerClose asChild>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="w-6 h-6" />
                        </Button>
                    </DrawerClose>
                </DrawerHeader>
                <div className="flex-1 overflow-y-auto">
                    <CreateCase onClose={onClose} />
                </div>
            </DrawerContent>
        </Drawer>
    );
}