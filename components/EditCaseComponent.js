import React, { useState, useEffect, useMemo } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { availableTokens } from '@/constants/tokens';
import caseAbi from '@/config/caseAbi.json';
import { Check, Trash, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { toast } from 'sonner';
import { colors } from '@/constants/mockData';


const Coin = ({ asset, assets, index, removeAsset, setAssets, token }) => {
    const [weightage, setWeightage] = useState();

    return (
        <Badge
            variant='outline'
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

            <div className='flex items-center gap-1 font-mono'>
                <Input
                    type='number'
                    placeholder={asset.weightage}
                    onChange={(e) => {
                        setWeightage(e.target.value);
                    }}
                    className='!w-[70px]'
                />
                %
                <div className="relative w-9 h-9">
                    <div
                        className={`absolute inset-0 transition-all duration-300 ease-in-out ${weightage
                            ? 'translate-y-0 opacity-100 pointer-events-auto'
                            : 'translate-y-full opacity-0 pointer-events-none'
                            }`}
                    >
                        <Button
                            onClick={() => {
                                setAssets(prev => prev.map((a, i) =>
                                    i === index ? { ...a, weightage: weightage } : a
                                ));
                            }}
                            variant='ghost'
                            className='rounded-full'
                            size='icon'
                        >
                            <Check className='w-4 h-4 text-green-500' />
                        </Button>
                    </div>
                    <div
                        className={`absolute inset-0 transition-all duration-300 ease-in-out ${!weightage
                            ? 'translate-y-0 opacity-100 pointer-events-auto'
                            : '-translate-y-full opacity-0 pointer-events-none'
                            }`}
                    >
                        <Button
                            onClick={() => removeAsset(assets.findIndex(a => a.currency === asset.currency))}
                            variant='ghost'
                            className='rounded-full'
                            size='icon'
                        >
                            <Trash className='w-4 h-4 text-red-500' />
                        </Button>
                    </div>
                </div>
            </div>
        </Badge>
    )
}


const EditCaseComponent = ({ caseId, currentTokens, currentWeights, onClose }) => {
    const [assets, setAssets] = useState(currentTokens.map((token, index) => ({
        currency: availableTokens.find(t => t.address === token)?.symbol || '',
        weightage: Number(currentWeights[index])
    })));
    const [isUpdatedAssets, setIsUpdatedAssets] = useState(false);


    useEffect(() => {
        const oldAssets = currentTokens.map((token, index) => ({
            currency: availableTokens.find(t => t.address === token)?.symbol || '',
            weightage: Number(currentWeights[index])
        }));
        setIsUpdatedAssets(JSON.stringify(oldAssets) !== JSON.stringify(assets));
    }, [assets]);



    const [selectedToken, setSelectedToken] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: hash, error: contractError, isPending, writeContractAsync } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    const remainingWeight = useMemo(() => {
        return 100 - assets.reduce((sum, asset) => sum + Number(asset.weightage), 0);
    }, [assets]);



    const handleTokenSelect = (tokenAddress) => {
        const token = availableTokens.find(t => t.address === tokenAddress);
        setSelectedToken(token);
        setSelectedWeight(0);
    };

    const handleAddAsset = () => {
        if (selectedToken && selectedWeight > 0) {
            const existingAssetIndex = assets.findIndex(asset => asset.currency === selectedToken.symbol);
            if (existingAssetIndex !== -1) {
                setAssets(prev => prev.map((asset, index) =>
                    index === existingAssetIndex ? { ...asset, weightage: selectedWeight } : asset
                ));
            } else {
                setAssets(prev => ([
                    ...prev,
                    { currency: selectedToken.symbol, weightage: selectedWeight }
                ]));
            }
            setSelectedToken(null);
            setSelectedWeight(0);
        }
    };

    const removeAsset = (index) => {
        setAssets(prev => prev.map((asset, i) =>
            i === index ? { ...asset, weightage: 0 } : asset
        ));
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
            }); onClose();
            toast.success('Case updated successfully');
        } catch (err) {
            console.error('Failed to update case:', err);
            toast.error(err.toString().split(':')[2]);
        }
    };

    useEffect(() => {
        if (isConfirmed) {
            onClose();
            toast.success("Case updated successfully");
        }
    }, [isConfirmed, onClose]);

    return (
        <div className="flex flex-col w-full gap-4">
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
                    {assets.filter(asset => asset.weightage > 0).map((asset, index) => (
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
                    {assets.filter(asset => asset.weightage > 0).map((asset, index) => {
                        const token = availableTokens.find(
                            (t) => t.symbol === asset.currency
                        );

                        return (
                            <Coin token={token} key={index} asset={asset} assets={assets} index={index} removeAsset={removeAsset} setAssets={setAssets} />
                        );
                    })}
                </div>
            </div>
            {remainingWeight > 0 && (
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
                                {availableTokens.map((token) => (
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
            )}

            <Button
                onClick={handleSubmit}
                disabled={isPending || isConfirming || remainingWeight !== 0 || !isUpdatedAssets}
                className="w-full"
            >
                {isPending ? isConfirming ? 'Updating' : 'Pending' : 'Update Case'}
            </Button>
        </div>
    );
};

export default EditCaseComponent;