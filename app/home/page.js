'use client'
import React, { useState, useEffect } from 'react';
import { readContract } from '@wagmi/core'
import { useReadContract, useBalance, useAccount, useWriteContract, useSendTransaction } from 'wagmi';
import abi from '@/config/abi.json';
import { config } from '@/config/wagmiConfig'
import { Button } from '@/components/ui/button';
import { formatEther, parseEther } from 'viem';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
const caseFactoryAddress = '0xC6D6F52c3C9A9a54C881477f704bD9FD0F0A3295'
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
    const { data: message, isFetching, isError, Error, isRefetching, refetch } = useReadContract({
        abi: testAbi,
        address: caseFactoryAddress,
        functionName: 'retrieve',
        args: [],
        watch: true,
    })

    const { data: hash, error, status, writeContractAsync } = useWriteContract()



    const { address } = useAccount();

    const { sendTransaction } = useSendTransaction()

    const handleSendEth = async () => {
        try {
            sendTransaction({
                to: '0x32024F601DF72DD558562b074e90e2DE9A382acA',
                value: parseEther('0.01'),
            })

        } catch (error) {
            toast.error('Failed to send ETH: ' + error.message.toString().split('.')[0])
            console.error('Error sending ETH:', error)
        }
    }

    const fetchAllCases = async () => {
        let cases = []
        let i = 0;
        while (true) {
            try {
                const result = await readContract(config, {
                    abi: abi,
                    address: caseFactoryAddress,
                    functionName: 'creatorCases',
                    args: [address, i],
                })
                if (result) {
                    cases.push(result);
                    i++;
                } else {
                    break;
                }
            } catch (error) {
                console.error('Error fetching cases:', error)
                break;
            }
        }
        console.log(cases)
    }



    useEffect(() => {
        console.log(message, isRefetching)
    }, [isRefetching])



    const handleStoreValue = async (e) => {
        e.preventDefault()
        const value = e.target.value.value

        try {
            const tx = await writeContractAsync({
                abi: testAbi,
                address: caseFactoryAddress,
                functionName: 'store',
                args: [value], // Replace 42 with the actual value you want to store
            });
            console.log('Transaction sent:', tx);
            toast.success('Value storage transaction sent');
            refetch()

        } catch (error) {
            console.error('Error storing value:', error);
            toast.error('Failed to store value: ' + error.message.toString().split('.')[0]);
        }
    }

    useEffect(() => {
        // You can call handleStoreValue here if you want to store a value when the component mounts
        // handleStoreValue();
    }, []);


    return (
        <div className="container p-4 mx-auto space-y-8">
            {/* <h1 className="mb-4 text-2xl font-bold">Home</h1>
            <p>Creation Fee: {creationFee ? formatEther(creationFee) : 'Loading...'}</p>
            <Button onClick={async () => {

                fetchAllCases()

            }}>Refetch</Button>
            <Button onClick={handleCreateCase}>Create Case</Button>
            <Button onClick={() => { handleSendEth() }}>Send ETH</Button>
            <p>Hash: {hash}</p>
            <p>Error: {error?.message?.toString().split('.')[0]}</p>
            <p>Status: {status}</p> */}
            <p> {isFetching ? 'Loading...' : isError ? Error?.toString() : message}</p>

            <Button onClick={() => { refetch() }}>Refetch</Button>

            <form onSubmit={handleStoreValue}>
                <Input type="text" name="value" />
                <Button type="submit">Store Value</Button>
            </form>


        </div >
    );
};

export default HomePage;