import React from 'react'
import { CircleGaugeIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

function VolatilityBadge({ volatility }) {
    const getVolatilityIcon = (volatility) => {
        if (volatility.toLowerCase().includes('low')) return <CircleGaugeIcon className='w-4 h-4 text-green-500 -rotate-90' />;
        if (volatility.toLowerCase().includes('medium')) return <CircleGaugeIcon className='w-4 h-4 text-orange-500 -rotate-45' />;
        if (volatility.toLowerCase().includes('high')) return <CircleGaugeIcon className='w-4 h-4 text-red-500 ' />;
        return <></>; //  
    };
    return (
        <Badge variant="outline" className={`text-xs font-medium  border-transparent p-1 flex items-center gap-1`}>
            {getVolatilityIcon(volatility)} {volatility}
        </Badge>
    )
}

export default VolatilityBadge