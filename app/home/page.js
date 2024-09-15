'use client'
import React, { useState, useEffect } from 'react';
import { SendCrypto } from '@/components/SendCrypto';
import { useReadContract, useBalance, useAccount, useWriteContract } from 'wagmi';
import abi from '@/config/abi.json';
import { readContract } from 'viem/actions';
import { config } from '@/config/wagmiConfig';

const testAbi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "message1",
                "type": "string"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const HomePage = () => {
    const [message, setMessage] = useState('')


    const { data: hash, writeContract } = useWriteContract()

    const { data: balance } = useBalance({
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        chainId: 11155111,
    });
    const account = useAccount()




    const handleStore = () => {
        const message = document.getElementById('message').value
        writeContract({
            abi: testAbi,
            address: '0xC6D6F52c3C9A9a54C881477f704bD9FD0F0A3295',
            functionName: 'store',
            args: [message],
        })
        console.log(hash)
    }

    const handleRetrieve = async () => {
        const { data } = await readContract(config, {
            abi: testAbi,
            address: '0xC6D6F52c3C9A9a54C881477f704bD9FD0F0A3295',
            functionName: 'retrieve',
        })
        console.log(data)
    }


    return (
        <div className="container p-4 mx-auto space-y-8">
            <h1 className="mb-4 text-2xl font-bold">Home</h1>
            {/* <SendCrypto /> */}
            <p>Message: {message}</p>
            <input id='message' type="text" placeholder="Enter message" />
            <button onClick={handleStore}>Store</button>
            <button onClick={handleRetrieve}>Retrieve</button>

        </div>
    );
};

export default HomePage;