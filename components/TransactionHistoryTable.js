'use client'
import React from 'react';

function TransactionHistoryTable() {
    // Mock transaction history data (replace this with actual data fetching logic)
    const transactions = [
        { timestamp: (1726049573890), hash: '0x1234567890abcdef1234567890abcdef12345678', amount: 1000, type: 'buy' },
        { timestamp: (1725876773890), hash: '0xabcdef1234567890abcdef1234567890abcdef12', amount: 500, type: 'sell' },
        { timestamp: (1725703973890), hash: '0x90abcdef1234567890abcdef1234567890abcdef', amount: 750, type: 'buy' },
    ];

    return (
        <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full overflow-hidden rounded-lg">
                <thead className="bg-foreground/10">
                    <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Date & Time</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Transaction Hash</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Amount</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Type</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(transaction.timestamp).toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <a href={`https://etherscan.io/tx/${transaction.hash}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    {transaction.hash.substring(0, 10)}...{transaction.hash.substring(transaction.hash.length - 10)}
                                </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">${transaction.amount.toFixed(2)}</td>
                            <td className={`px-6 py-4 whitespace-nowrap ${transaction.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                                {transaction.type}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionHistoryTable;