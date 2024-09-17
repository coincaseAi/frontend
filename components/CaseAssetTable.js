'use client'

import { availableTokens } from '@/constants/tokens';
import React, { useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import abi from '@/config/abi.json';
import caseWalletAbi from '@/config/caseWalletAbi.json';
import { caseFactoryAddress } from '@/constants/mockData';
import { formatEther, formatUnits, parseEther } from 'viem';
import { Skeleton } from './ui/skeleton';

const currentPrice = 123;
const avgBuyingPrice = 123;
const returns = 12;
const quantity = 123;

const AssetRow = ({ asset, caseAddress, caseHoldingWallet, weights, index, setTotalInvestment }) => {
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

    const rateInUSDT = tokenRate ? Number(formatUnits(tokenRate[1], 6)).toFixed(2) : '0.00';
    const quantity = caseHolding ? Number(formatEther(caseHolding)).toFixed(2) : '0.00';

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
        isLoading ? <Skeleton className='w-full h-6' /> :
            isError ? <div>Error</div> :
                <tr className="text-xs">
                    <td className="px-6 py-4 whitespace-nowrap">{asset.symbol}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {caseHolding ? quantity : '-'}
                    </td>  <td className="px-6 py-4 whitespace-nowrap">
                        {weights[index] ? Number(weights[index]) : 0}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        ${rateInUSDT}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">${(quantity * rateInUSDT).toFixed(2)}</td>
                </tr>
    )
}

function CaseAssetTable({ assets, weights, caseId, setTotalInvestment }) {
    const { address } = useAccount();
    const { data: caseHoldingWallet, isError, isLoading, Error } = useReadContract({
        address: caseFactoryAddress,
        abi: abi,
        functionName: 'userWallets',
        args: [address],

    });

    return (
        isLoading ? <Skeleton className='w-full h-6' /> :
            isError ? <div>Error: {Error.message}</div> :
                <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full overflow-hidden rounded-lg ">
                        <thead className="bg-foreground/10">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Name</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Quantity</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Weight</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Rate (USD)</th>

                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Value (USD)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y ">
                            {assets.map((coin, index) => {
                                const asset = availableTokens.find(token => token.address === coin);
                                return (
                                    <AssetRow weights={weights} caseAddress={caseId} asset={asset} caseHoldingWallet={caseHoldingWallet} key={index} index={index} setTotalInvestment={setTotalInvestment} />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
    )

}

export default CaseAssetTable;