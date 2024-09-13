import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign } from 'lucide-react';

export default function InvestmentCard({ isFirstTimeInvestor, currentInvestment, minimumInvestment }) {
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

                            placeholder={`Min $${minimumInvestment}`}
                            className="flex-grow p-2 text-black bg-white border rounded"
                        />
                        <Button size="lg" >
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