import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const FilterOptions = () => {
    return (
        <div className="flex w-full max-w-md gap-2">
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="min-amount">Minimum Amount</SelectItem>
                    <SelectItem value="recently-rebalanced">Recently Rebalanced</SelectItem>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Returns" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1d">Last 1 Day</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="1m">1 Month</SelectItem>
                    <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default FilterOptions
