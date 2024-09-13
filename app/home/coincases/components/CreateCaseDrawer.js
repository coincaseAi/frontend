'use client';

import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import CreateCase from '@/components/ui/CreateCase';

export function CreateCaseDrawer({ isOpen, onClose }) {
    return (
        <Drawer open={isOpen} onClose={onClose}>
            <DrawerContent className="h-full max-h-[100dvh]">
                <DrawerHeader className="flex items-center justify-between">
                    <DrawerTitle>Create New Case</DrawerTitle>
                    <DrawerClose asChild>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </DrawerClose>
                </DrawerHeader>
                <div className="flex-1 p-4 pb-0 overflow-y-auto">
                    <CreateCase onClose={onClose} />
                </div>
            </DrawerContent>
        </Drawer>
    );
}