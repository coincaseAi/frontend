'use client';

import React, { useState } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check } from "lucide-react";

const plans = [
    { duration: 3, label: '3 months', discount: 0 },
    { duration: 6, label: '6 months', discount: 5 },
    { duration: 12, label: '1 year', discount: 10 },
];

export default function SubscribeDrawer({ caseData, onSubscribe }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(plans[0]);

    const calculateTotalAmount = () => {
        const baseAmount = caseData.subscriptionFee * selectedPlan.duration;
        const discountAmount = baseAmount * (selectedPlan.discount / 100);
        return (baseAmount - discountAmount).toFixed(2);
    };

    const handleSubscribe = () => {
        onSubscribe(selectedPlan.duration, calculateTotalAmount());
        setIsOpen(false);
        toast.success(`Successfully subscribed to ${caseData.name} for ${selectedPlan.label}`);
    };

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button className="w-full" size="lg">
                    Subscribe Now
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-md mx-auto">
                <DrawerHeader>
                    <DrawerTitle>
                        <span className="mr-2 text-muted-foreground">
                            Subscribing to
                        </span>
                        {caseData.name}
                    </DrawerTitle>
                    <DrawerDescription>
                        Choose a subscription plan and confirm your subscription.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                    <div className='grid grid-cols-2 gap-1'>
                        <div className='flex flex-col gap-1 p-2 rounded-md bg-muted'>
                            <p className="text-xs text-muted-foreground">Minimum Investment </p>
                            <p className="font-semibold ">${caseData.minimumInvestment}</p>
                        </div>
                        <div className='flex flex-col gap-1 p-2 rounded-md bg-muted'>
                            <p className="text-xs text-muted-foreground">Subscription Fee </p>
                            <p className="font-semibold">${caseData.subscriptionFee}/month</p>
                        </div>
                    </div>

                    <RadioGroup
                        defaultValue={selectedPlan.duration.toString()}
                        onValueChange={(value) => setSelectedPlan(plans.find(plan => plan.duration === parseInt(value)))}
                        className="grid grid-cols-3 gap-2"
                    >
                        {plans.map((plan) => (
                            <Label
                                key={plan.duration}
                                htmlFor={`plan-${plan.duration}`}
                                className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${selectedPlan.duration === plan.duration
                                    ? 'border-green-500 bg-green-500/10'
                                    : 'border-muted hover:border-primary/50'
                                    }`}
                            >
                                <RadioGroupItem
                                    value={plan.duration.toString()}
                                    id={`plan-${plan.duration}`}
                                    className="sr-only"
                                />
                                <span className="font-semibold ">{plan.label}</span>
                                {plan.discount > 0 && (
                                    <span className="text-xs text-green-600">({plan.discount}% off)</span>
                                )}

                            </Label>
                        ))}
                    </RadioGroup>
                    <div className='flex flex-col gap-1 mt-4'>
                        <div className="flex items-center justify-between gap-1 ">
                            <p className="flex gap-2 text-lg font-semibold text-muted-foreground">Total Amount </p>
                            <span className="text-xl font-bold text-primary">${calculateTotalAmount()}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">You will be charged <span className="font-semibold text-primary">${caseData.subscriptionFee}</span> every <span className="font-semibold text-primary">{selectedPlan.duration} months</span></p>
                    </div>
                </div>
                <DrawerFooter>
                    <Button onClick={handleSubscribe}>Confirm Subscription</Button>
                    <DrawerClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}