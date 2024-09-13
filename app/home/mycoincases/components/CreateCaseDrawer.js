'use client';

import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import CreateCase from '@/components/CreateCase';

export function CreateCaseDrawer({ isOpen, onClose }) {
    return (
        <Drawer open={isOpen} onClose={onClose}>
            <DrawerContent className="h-full max-h-[90dvh]">
                <DrawerHeader className="flex items-center justify-between">
                    <DrawerTitle className="text-2xl font-semibold">Create New Case</DrawerTitle>
                    <DrawerClose asChild>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="w-5 h-5" />
                        </Button>
                    </DrawerClose>
                </DrawerHeader>
                <div className="flex-1 overflow-y-auto ">
                    <CreateCase onClose={onClose} />
                </div>
            </DrawerContent>
        </Drawer>
    );
}