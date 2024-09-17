import React, { useState, useEffect, useMemo } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { availableTokens } from '@/constants/tokens';
import caseAbi from '@/config/caseAbi.json';
import { Trash, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { toast } from 'sonner';

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56'];

const EditCaseComponent = ({ caseId, currentTokens, currentWeights, onClose }) => {
    const [assets, setAssets] = useState(currentTokens.map((token, index) => ({
        currency: availableTokens.find(t => t.address === token)?.symbol || '',
        weightage: Number(currentWeights[index])
    })));

    const [selectedToken, setSelectedToken] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: hash, error: contractError, isPending, writeContractAsync } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    const remainingWeight = useMemo(() => {
        return 100 - assets.reduce((sum, asset) => sum + asset.weightage, 0);
    }, [assets]);

    const filteredTokens = useMemo(() => {
        return availableTokens.filter(token =>
        (token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, assets]);

    const handleTokenSelect = (tokenAddress) => {
        const token = availableTokens.find(t => t.address === tokenAddress);
        setSelectedToken(token);
        setSelectedWeight(0);
    };

    const handleAddAsset = () => {
        if (selectedToken && selectedWeight > 0) {
            if (assets.some(asset => asset.currency === selectedToken.symbol)) {
                toast.error("This token is already in the case");
                return;
            }
            setAssets(prev => ([
                ...prev,
                { currency: selectedToken.symbol, weightage: selectedWeight }
            ]))
            setSelectedToken(null);
            setSelectedWeight(0);
        }
    };

    const removeAsset = (index) => {
        setAssets(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (remainingWeight !== 0) {
            toast.error("Total weightage must equal 100%");
            return;
        }
        const tokens = assets.map(asset =>
            availableTokens.find(t => t.symbol === asset.currency).address
        );
        const weights = assets.map(asset => asset.weightage);
        console.log(tokens, weights);
        try {
            await writeContractAsync({
                address: caseId,
                abi: caseAbi,
                functionName: 'updateWeightage',
                args: [tokens, weights],
            });
        } catch (err) {
            console.error('Failed to update case:', err);
            toast.error(err.message.split('.')[0]);
        }
    };

    useEffect(() => {
        if (isConfirmed) {
            onClose();
            toast.success("Case updated successfully");
        }
    }, [isConfirmed, onClose]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <div>
                <div className='flex justify-between gap-2 mb-4'>
                    <h2 className="text-xl font-bold">Edit Case</h2>
                    <X className='cursor-pointer' onClick={onClose} />
                </div>
                <div className='flex items-center justify-between'>
                    <h3 className='text-sm font-semibold '>Assets</h3>
                    <span className='font-mono text-xs text-muted-foreground'>
                        {100 - remainingWeight}% / 100%
                    </span>
                </div>
                <div className='flex w-full h-6 mb-2 overflow-hidden rounded-md'>
                    {assets.map((asset, index) => (
                        <div
                            key={index}
                            style={{
                                width: `${asset.weightage}%`,
                                backgroundColor: colors[index % colors.length],
                            }}
                            className='h-full'
                            title={`${asset.currency}: ${asset.weightage}%`}
                        />
                    ))}
                    <div
                        style={{ width: `${remainingWeight}%` }}
                        className='h-full bg-muted-foreground '
                    ></div>
                </div>
                <div className='grid grid-cols-1 gap-1 '>
                    {assets.map((asset, index) => {
                        const token = availableTokens.find(
                            (t) => t.symbol === asset.currency
                        );
                        return (
                            <Badge
                                variant='outline'
                                key={index}
                                className='flex items-center justify-between gap-1 p-1 text-sm rounded-full'
                            >
                                <div className='flex items-center gap-1'>
                                    <div
                                        className='w-6 h-6 ml-1 rounded-full'
                                        style={{
                                            backgroundColor: colors[index % colors.length],
                                        }}
                                    ></div>
                                    <Avatar className='w-6 h-6 bg-white'>
                                        <AvatarImage
                                            src={token?.logoURI}
                                            alt={asset.currency}
                                        />
                                        <AvatarFallback>
                                            {asset.currency.slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {asset.currency}
                                </div>
                                <Input value={asset.weightage} onChange={(e) => setAssets(prev => prev.map((a, i) => i === index ? { ...a, weightage: e.target.value } : a))} />
                                <div className='flex items-center gap-1 font-mono'>
                                    {asset.weightage}%

                                    <Button
                                        onClick={() => removeAsset(index)}
                                        variant='ghost'
                                        className='rounded-full'
                                        size='sm'
                                    >
                                        <Trash className='w-4 h-4 text-red-500' />
                                    </Button>
                                </div>
                            </Badge>
                        );
                    })}
                </div>
            </div>
            {
                remainingWeight > 0 && (
                    <div className='flex flex-col w-full gap-4 pt-8 '>
                        <div className='flex items-center justify-center gap-2 -mt-6 text-muted-foreground'>
                            <div className='flex-grow h-0.5 rounded-full bg-muted'>
                            </div>
                            <Label>Add Token</Label>
                            <div className='flex-grow h-0.5 rounded-full bg-muted'>
                            </div>
                        </div>
                        <Select onValueChange={handleTokenSelect}>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder='Select a token' />
                            </SelectTrigger>
                            <SelectContent>
                                <Input
                                    placeholder='Search tokens...'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className='mb-2'
                                />
                                <div className='max-h-[200px] overflow-y-auto'>
                                    {filteredTokens.map((token) => (
                                        <SelectItem key={token.address} value={token.address}>
                                            <div className='flex items-center gap-1'>
                                                <Avatar className='w-4 h-4 bg-white'>
                                                    <AvatarImage src={token?.logoURI} alt={token.name} />
                                                    <AvatarFallback>
                                                        {token.symbol.slice(0, 2)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {token.name} ({token.symbol})
                                            </div>
                                        </SelectItem>
                                    ))}
                                </div>
                            </SelectContent>
                        </Select>

                        {selectedToken && (
                            <div className='grid w-full items-center gap-1.5'>
                                <div className='flex items-center gap-2 p-2 mb-4 border rounded-md border-muted'>
                                    <Label className='text-sm'>Weight </Label>{' '}
                                    <Slider
                                        value={[selectedWeight]}
                                        onValueChange={(value) => setSelectedWeight(value[0])}
                                        max={remainingWeight}
                                        step={1}
                                    />
                                    <span className='font-mono text-sm'>{selectedWeight}%</span>
                                </div>
                                <Button
                                    onClick={handleAddAsset}
                                    disabled={selectedWeight === 0}
                                >
                                    Add Token
                                </Button>
                            </div>
                        )}
                    </div>
                )
            }

            <Button
                type="submit"
                disabled={isPending || isConfirming || remainingWeight !== 0}
                className="w-full"
            >
                {isPending || isConfirming ? 'Updating...' : 'Update Case'}
            </Button>
        </form >
    );
};

export default EditCaseComponent;