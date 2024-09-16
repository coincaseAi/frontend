'use client'
import React, { useState, useEffect } from 'react';
import { readContract } from '@wagmi/core'
import { useReadContract, useBalance, useAccount, useWriteContract, useSendTransaction } from 'wagmi';
import abi from '@/config/abi.json';
import { config } from '@/config/wagmiConfig'
import { Button } from '@/components/ui/button';
import { formatEther, parseEther } from 'viem';
import { toast } from 'sonner';
const caseFactoryAddress = '0xE634d83f8E016B04e51F2516e6086b5f238675C7'

const HomePage = () => {
    const { data: creationFee, isLoading, isError, isRefetching, refetch } = useReadContract({
        abi: abi,
        address: caseFactoryAddress,
        functionName: 'getCreationFee',
        args: [],
        enabled: true,
    })

    const { data: hash, error, status, writeContractAsync } = useWriteContract()

    const handleCreateCase = async () => {
        try {
            const tx = await writeContractAsync({
                abi: abi,
                address: caseFactoryAddress,
                functionName: 'createCase',
                args: [
                    "My First Case",
                    [
                        "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", // UNI
                        "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"  // WBTC
                    ],
                    [50, 50],
                    '0x0000000000000000000000000000000000000000', // ETH as payment token
                    [
                        parseEther("0"),
                        parseEther("0"),
                        parseEther("0")
                    ],
                    false // Making this case public
                ],
            })
            console.log(tx)
        } catch (error) {
            toast.error(error.message.toString().split('.')[0])
            console.log(error.message.toString().split('.')[0])
        }
    }

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
        console.log(creationFee, isRefetching)
    }, [isRefetching])


    return (
        <div className="container p-4 mx-auto space-y-8">
            <h1 className="mb-4 text-2xl font-bold">Home</h1>
            <p>Creation Fee: {creationFee ? formatEther(creationFee) : 'Loading...'}</p>
            <Button onClick={async () => {

                fetchAllCases()

            }}>Refetch</Button>
            <Button onClick={handleCreateCase}>Create Case</Button>
            <Button onClick={() => { handleSendEth() }}>Send ETH</Button>
            <p>Hash: {hash}</p>
            <p>Error: {error?.message?.toString().split('.')[0]}</p>
            <p>Status: {status}</p>
        </div >
    );
};

export default HomePage;