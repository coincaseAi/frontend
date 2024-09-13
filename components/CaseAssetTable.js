'use client'

import React from 'react';

const currentPrice = 123;
const avgBuyingPrice = 123;
const returns = 12;
const quantity = 123;

function CaseAssetTable({ assets }) {
    return (
        <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full overflow-hidden rounded-lg ">
                <thead className="bg-foreground/10">
                    <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Name</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Current Price</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Avg Buying Price</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Returns (%)</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Weight (%)</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Quantity</th>
                    </tr>
                </thead>
                <tbody className="divide-y ">
                    {assets.map((asset, index) => (
                        <tr key={index} className="">
                            <td className="px-6 py-4 whitespace-nowrap">{asset.currency}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${currentPrice}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${avgBuyingPrice}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={returns >= 0 ? 'text-green-600' : 'text-red-600'}>
                                    {returns}%
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{asset.weightage}%</td>
                            <td className="px-6 py-4 whitespace-nowrap">{quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CaseAssetTable;