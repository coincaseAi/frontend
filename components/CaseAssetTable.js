'use client'

import { availableTokens } from '@/constants/tokens';
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import abi from '@/config/abi.json';
import caseWalletAbi from '@/config/caseWalletAbi.json';
import { caseFactoryAddress } from '@/constants/mockData';
import { formatEther, formatUnits, parseEther } from 'viem';
import { Skeleton } from './ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const AssetRow = ({ asset, caseAddress, caseHoldingWallet, weights, index, setTotalInvestment, isSubscriptionActive }) => {
    const [rateInUSDT, setRateInUSDT] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [valueInUSD, setValueInUSD] = useState(0);
    const { data: caseHolding, isError, isLoading, Error } = useReadContract({
        address: caseHoldingWallet,
        abi: caseWalletAbi,
        functionName: 'getCaseHolding',
        args: [caseAddress, asset.address],
    });



    const { data: tokenRate } = useReadContract({
        address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Uniswap V2 Router address
        abi: [{ "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }], "name": "getAmountsOut", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }],
        functionName: 'getAmountsOut',
        args: [parseEther('1'), [asset.address, '0xdAC17F958D2ee523a2206206994597C13D831ec7']], // path from asset to USDT
    });

    useEffect(() => {
        if (tokenRate) {
            const rate = Number(formatUnits(tokenRate[1], 6))
            const toFixedValue = rate.toString().includes('.') ? rate.toString().split('.')[1].length : 0;
            const quantity = caseHolding ? Number(formatEther(caseHolding)) : 0;
            setRateInUSDT(rate.toFixed(toFixedValue));
            setQuantity(quantity.toFixed(toFixedValue));
            setValueInUSD((quantity * rate).toFixed(toFixedValue))
        }
    }, [tokenRate]);

    useEffect(() => {
        if (caseHolding) {
            const invested = quantity * rateInUSDT
            invested && setTotalInvestment((prev) => {
                return {
                    ...prev,
                    [asset.symbol]: invested
                }
            });

        }
    }, [rateInUSDT, quantity]);



    return (
        isLoading ?
            <tr>
                <td colSpan={5} className="text-center">
                    <Skeleton className='w-full h-6' />
                </td>
            </tr> :
            isError ? <div>Error</div> :
                <tr className="text-xs">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                            <Avatar className="w-6 h-6">
                                <AvatarImage src={asset.logoURI} alt={asset.symbol} />
                                <AvatarFallback>{asset.symbol.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            {asset.symbol}
                        </div>

                    </td>
                    {isSubscriptionActive && <td className="px-6 py-4 whitespace-nowrap">
                        {caseHolding ? quantity : '-'}
                    </td>}
                    {isSubscriptionActive && <td className="px-6 py-4 whitespace-nowrap">
                        {weights[index] ? Number(weights[index]) : 0}%
                    </td>}
                    <td className="px-6 py-4 whitespace-nowrap">
                        ${rateInUSDT}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">${valueInUSD}</td>
                </tr>
    )
}

function CaseAssetTable({ assets, weights, caseId, setTotalInvestment, setPrevWeights, caseHoldingWallet, showDetails }) {
    const { address } = useAccount();


    //to fetch prev weights
    const { data: previousWeights, isError, isLoading, error } = useReadContract({
        address: caseHoldingWallet,
        abi: caseWalletAbi,
        functionName: 'getPreviousWeights',
        args: [caseId],
    });

    useEffect(() => {
        if (previousWeights) {
            setPrevWeights(previousWeights)
        }
    }, [previousWeights])

    return (
        isLoading ? <Skeleton className='w-full h-6' /> :
            isError ? <div>Error: {error.message}</div> :
                <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full overflow-hidden rounded-lg ">
                        <thead className="bg-foreground/10">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Name</th>

                                {showDetails && <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Quantity</th>}
                                {showDetails && <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Weight</th>}
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Rate (USD)</th>

                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Value (USD)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y ">
                            {assets.map((coin, index) => {
                                const asset = availableTokens.find(token => token.address === coin);
                                return (
                                    <AssetRow isSubscriptionActive={showDetails} weights={weights} caseAddress={caseId} asset={asset} caseHoldingWallet={caseHoldingWallet} key={index} index={index} setTotalInvestment={setTotalInvestment} />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
    )

}

export default CaseAssetTable;