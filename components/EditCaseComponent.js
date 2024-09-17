import React, { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { availableTokens } from '@/constants/tokens';
import caseAbi from '@/config/caseAbi.json';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

const EditCaseComponent = ({ caseId, currentTokens, currentWeights, onClose }) => {
    const [assets, setAssets] = useState(
        currentTokens.map((token, index) => ({
            token,
            weight: BigInt(currentWeights[index])
        }))
    );
    const [error, setError] = useState('');

    const { data: hash, error: contractError, isPending, writeContractAsync } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    const handleAddAsset = () => {
        setAssets([...assets, { token: '', weight: BigInt(0) }]);
    };

    const handleRemoveAsset = (index) => {
        const newAssets = assets.filter((_, i) => i !== index);
        setAssets(newAssets);
        validateWeights(newAssets);
    };

    const handleAssetChange = (index, field, value) => {
        const newAssets = [...assets];
        newAssets[index][field] = field === 'weight' ? BigInt(value) : value;
        setAssets(newAssets);
        if (field === 'weight') {
            validateWeights(newAssets);
        }
    };

    const validateWeights = (newAssets) => {
        const sum = newAssets.reduce((acc, asset) => acc + asset.weight, BigInt(0));
        if (sum !== BigInt(100)) {
            setError(`The sum of weights must be 100. Current sum: ${sum.toString()}`);
        } else {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tokens = assets.map(asset => asset.token);
        const weights = assets.map(asset => asset.weight);
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
            setError(err.message);
        }
    };

    useEffect(() => {
        if (isConfirmed) {
            onClose();
        }
    }, [isConfirmed, onClose]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 ">
            <h2 className="text-xl font-bold">Edit Case</h2>
            {assets.map((asset, index) => (
                <div key={index} className="flex items-end w-full space-x-2">
                    <div className="flex-1">
                        <Label htmlFor={`token-${index}`}>Token</Label>
                        <Select
                            value={asset.token}
                            onValueChange={(value) => handleAssetChange(index, 'token', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select token" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableTokens.map((t) => (
                                    <SelectItem key={t.address} value={t.address}>
                                        {t.symbol}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1">
                        <Label htmlFor={`weight-${index}`}>Weight</Label>
                        <Input
                            id={`weight-${index}`}
                            type="number"
                            value={asset.weight.toString()}
                            onChange={(e) => handleAssetChange(index, 'weight', e.target.value)}
                            min="0"
                            max="100"
                        />
                    </div>
                    <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveAsset(index)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ))}
            <Button className="mx-auto" type="button" variant="outline" onClick={handleAddAsset}>
                <Plus className="w-4 h-4 mr-2" /> Add Asset
            </Button>

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="w-4 h-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Button
                type="submit"
                disabled={isPending || !!error}
                className="w-full"
            >
                {isPending || isConfirming ? 'Updating...' : 'Update Case'}
            </Button>
        </form>
    );
};

export default EditCaseComponent;