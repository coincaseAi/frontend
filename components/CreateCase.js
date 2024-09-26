'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Trash, X } from 'lucide-react';
import { maticTokens, availableTokens } from '@/constants/tokens';
import { caseFactoryAddress, colors } from '@/constants/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import abi from '@/config/abi.json';

const tokens = availableTokens;
const paymentToken = '0x0000000000000000000000000000000000000000'


const steps = [
  { title: 'Basic Information', fields: ['name', 'description'] },
  { title: 'Asset Allocation', fields: ['assets'] },
  {
    title: 'Investment Details',
    fields: [
      'minimumInvestment',
      'feeType',
      'subscriptionFee1Month',
      'subscriptionFee6Months',
      'subscriptionFee12Months',
    ],
  },
  { title: 'Review', fields: [] },
];

export default function CreateCase({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    assets: [],
    minimumInvestment: '',
    isPublic: false,
    feeType: 'free',
    subscriptionFee1Month: '',
    subscriptionFee6Months: '',
    subscriptionFee12Months: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [remainingWeight, setRemainingWeight] = useState(100);

  const filteredTokens = useMemo(() => tokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm]);

  useEffect(() => {
    const totalWeight = formData.assets.reduce(
      (sum, asset) => sum + asset.weightage,
      0
    );
    setRemainingWeight(100 - totalWeight);
  }, [formData.assets]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }, [formData]);

  const handleFeeTypeChange = useCallback((value) => {
    setFormData({ ...formData, feeType: value });
  }, [formData]);

  const handleTokenSelect = useCallback((tokenAddress) => {
    const token = tokens.find(t => t.address === tokenAddress);
    setSelectedToken(token);
    setSelectedWeight(0);
  }, []);

  const handleAddAsset = useCallback(() => {
    if (selectedToken && selectedWeight > 0) {
      setFormData((prevData) => {
        const existingAssetIndex = prevData.assets.findIndex(
          (asset) => asset.currency === selectedToken.symbol
        );

        if (existingAssetIndex !== -1) {
          // If the asset already exists, update its weight
          const updatedAssets = [...prevData.assets];
          updatedAssets[existingAssetIndex].weightage = selectedWeight;
          return { ...prevData, assets: updatedAssets };
        } else {
          // If it's a new asset, add it to the array
          return {
            ...prevData,
            assets: [
              ...prevData.assets,
              { currency: selectedToken.symbol, weightage: selectedWeight },
            ],
          };
        }
      });
      setSelectedToken(null);
      setSelectedWeight(0);
    }
  }, [formData, selectedToken, selectedWeight]);

  const removeAsset = useCallback((index) => {
    const newAssets = formData.assets.filter((_, i) => i !== index);
    setFormData({ ...formData, assets: newAssets });
  }, [formData]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const { writeContractAsync } = useWriteContract();

  const handleCreateCase = async () => {
    try {

      const tx = await writeContractAsync({
        abi: abi,
        address: caseFactoryAddress,
        functionName: 'createCase',
        args: [
          formData.name,
          formData.assets.map(asset => tokens.find(token => token.symbol === asset.currency).address),
          formData.assets.map(asset => asset.weightage),
          paymentToken,
          [
            parseEther(formData.subscriptionFee1Month || "0"),
            parseEther(formData.subscriptionFee6Months || "0"),
            parseEther(formData.subscriptionFee12Months || "0")
          ],
          formData.isPublic
        ],
        value: formData.isPublic ? parseEther("0.001") : 0
      });
      console.log('create case', tx);
      toast.success(`Case created successfully! \n ${tx}`);

      onClose && onClose();
    } catch (error) {
      toast.error(error.message.toString().split('.')[0]);
      console.log('Error creating case:', error);
    }
  };

  const handleSubmit = useCallback(() => {
    handleCreateCase();
  }, [formData]);

  const isStepValid = useCallback(() => {
    switch (currentStep) {
      case 0:
        return (
          formData.name.trim() !== '' && formData.description.trim() !== ''
        );
      case 1:
        return formData.assets.length > 0 && remainingWeight === 0;
      case 2:
        if (formData.feeType === 'free') {
          return formData.minimumInvestment !== '';
        }
        return (
          formData.minimumInvestment !== '' &&
          formData.subscriptionFee1Month !== '' &&
          formData.subscriptionFee6Months !== '' &&
          formData.subscriptionFee12Months !== ''
        );
      case 3:
        return true; // Review step is always valid
      default:
        return false;
    }
  }, [formData, currentStep, remainingWeight]);

  const handleSwitchChange = (checked) => {
    setFormData({ ...formData, isPublic: checked, feeType: 'free' });
  };

  const renderStepContent = useCallback((step) => {
    switch (step) {
      case 0:
        return (
          <>
            <div className='grid w-full  items-center gap-1.5'>
              <Label htmlFor='name'>Case Name</Label>
              <Input
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                placeholder='Enter case name'
              />
            </div>
            <div className='grid w-full  items-center gap-1.5'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                placeholder='Describe your case'
              />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm font-semibold '>Assets</h3>
                <span className='font-mono text-xs text-muted-foreground'>
                  {100 - remainingWeight}% / 100%
                </span>
              </div>
              <div className='flex w-full h-6 mb-2 overflow-hidden rounded-md'>
                {formData.assets.map((asset, index) => (
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
                {formData.assets.map((asset, index) => {
                  const token = tokens.find(
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
            {remainingWeight > 0 && (
              <div className='flex flex-col w-full gap-2 pt-8 '>
                <div className='flex items-center justify-center gap-2 -mt-6 text-muted-foreground'>
                  <div className='flex-grow h-0.5 rounded-full bg-muted'>
                  </div>
                  <Label>Add Token</Label>
                  <div className='flex-grow h-0.5 rounded-full bg-muted'>
                  </div>
                </div>


                {selectedToken && <div className='flex items-center gap-1 px-2 py-1 border rounded-md border-muted'>
                  <div className='flex flex-col flex-grow gap-1'>
                    <span className='text-xs text-muted-foreground'>
                      Selected Token
                    </span>
                    <div className='flex items-center gap-1'>
                      <Avatar className='w-4 h-4 bg-white'>
                        <AvatarImage src={selectedToken?.logoURI} alt={selectedToken.name} />
                        <AvatarFallback>
                          {selectedToken.symbol.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {selectedToken.name} ({selectedToken.symbol})
                    </div>
                  </div>
                  <Button onClick={() => { setSelectedToken(null); setSearchTerm('') }} size='icon' variant='ghost'><X className='w-4 h-4' /></Button>

                </div>}
                {!selectedToken && <div className='flex flex-col  gap-0.5'>
                  <Input
                    placeholder='Search token'
                    value={searchTerm}
                    onChange={(e) => { e.preventDefault(); setSearchTerm(e.target.value) }}
                    className='mb-2'
                  // Prevent focus from shifting when typing

                  />
                  <div className='max-h-[160px] w-full overflow-y-auto p-1 rounded-md border border-muted'>

                    {filteredTokens.length === 0 && <div className='text-muted-foreground'>No tokens found</div>}
                    {filteredTokens.map((token) => (

                      <div key={token.address} onClick={() => { handleTokenSelect(token.address); setSearchTerm('') }} className='flex items-center gap-1 p-1 rounded-md hover:bg-muted'>
                        <Avatar className='w-6 h-6 bg-white'>
                          <AvatarImage src={token?.logoURI} alt={token.name} />
                          <AvatarFallback>
                            {token.symbol.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        {token.name} ({token.symbol})
                      </div>

                    ))}
                  </div>
                </div>}

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
          </>
        );
      case 2:
        return (
          <>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='minimumInvestment'>Minimum Investment</Label>
              <Input
                id='minimumInvestment'
                name='minimumInvestment'
                value={formData.minimumInvestment}
                onChange={handleInputChange}
                placeholder='Minimum investment amount'
                type='number'
              />
            </div>
            <div className='flex items-center justify-between'>
              <Label htmlFor='isPublic'>Make case public</Label>
              <Switch
                id='isPublic'
                checked={formData.isPublic}
                onCheckedChange={handleSwitchChange}
              />
            </div>

            {formData.isPublic && (
              <>
                <div className='grid w-full items-center gap-1.5'>
                  <Label>Subscription Type</Label>
                  <RadioGroup
                    value={formData.feeType}
                    onValueChange={handleFeeTypeChange}
                    className='grid grid-cols-2 gap-4'
                  >
                    <Card
                      className={`cursor-pointer ${formData.feeType === 'free' ? 'border-primary' : ''
                        }`}
                      onClick={() => handleFeeTypeChange('free')}
                    >
                      <CardContent className='flex items-center justify-between p-4'>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='free' id='free' />
                          <Label htmlFor='free'>Free</Label>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer ${formData.feeType === 'subscription' ? 'border-primary' : ''
                        }`}
                      onClick={() => handleFeeTypeChange('subscription')}
                    >
                      <CardContent className='flex items-center justify-between p-4'>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='subscription' id='subscription' />
                          <Label htmlFor='subscription'>Subscription</Label>
                        </div>
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </div>
                {formData.feeType === 'subscription' && (
                  <div className='grid grid-cols-3 gap-2'>
                    <div className='grid w-full items-center gap-1.5'>
                      <Label htmlFor='subscriptionFee1Month'>1 Month Fee</Label>
                      <Input
                        id='subscriptionFee1Month'
                        name='subscriptionFee1Month'
                        value={formData.subscriptionFee1Month}
                        onChange={handleInputChange}
                        placeholder='1 month fee'
                        type='number'
                      />
                    </div>
                    <div className='grid w-full items-center gap-1.5'>
                      <Label htmlFor='subscriptionFee6Months'>6 Months Fee</Label>
                      <Input
                        id='subscriptionFee6Months'
                        name='subscriptionFee6Months'
                        value={formData.subscriptionFee6Months}
                        onChange={handleInputChange}
                        placeholder='6 months fee'
                        type='number'
                      />
                    </div>
                    <div className='grid w-full items-center gap-1.5'>
                      <Label htmlFor='subscriptionFee12Months'>12 Months Fee</Label>
                      <Input
                        id='subscriptionFee12Months'
                        name='subscriptionFee12Months'
                        value={formData.subscriptionFee12Months}
                        onChange={handleInputChange}
                        placeholder='12 months fee'
                        type='number'
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        );
      case 3:
        return (
          <div className='flex flex-col gap-4'>
            <h3 className='text-lg font-semibold'>{formData.name}</h3>
            <p className='text-sm text-muted-foreground'>
              {formData.description}
            </p>

            <div className='flex flex-wrap gap-2'>
              {formData.assets.map((asset, index) => {
                const token = tokens.find(
                  (t) => t.symbol === asset.currency
                );
                return (
                  <Badge
                    key={index}
                    variant='outline'
                    className='flex items-center gap-1 p-1 text-sm'
                  >
                    <Avatar className='w-4 h-4 bg-white'>
                      <AvatarImage src={token?.logoURI} alt={asset.currency} />
                      <AvatarFallback>
                        {asset.currency.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className='text-sm'>{asset.currency}</span>
                    <span className='text-sm text-muted-foreground'>
                      {asset.weightage}%
                    </span>
                  </Badge>
                );
              })}
            </div>
            <div className='grid grid-cols-2 gap-1'>
              <div className='px-2 pb-1 rounded-md bg-muted'>
                <Label className='text-xs font-medium whitespace-nowrap text-muted-foreground'>
                  Minimum Investment
                </Label>
                <div>{formData.minimumInvestment}</div>
              </div>
            </div>


          </div>
        );
      default:
        return null;
    }
  }, [formData, currentStep, searchTerm, filteredTokens, selectedToken, selectedWeight, remainingWeight, handleTokenSelect, handleAddAsset]);

  return (
    <div className='flex flex-col h-full max-w-md p-4 mx-auto '>
      <div className='flex-grow mb-6'>
        <div className='flex mb-4 items-center gap-0.5 overflow-hidden '>
          <span className='text-xs text-muted-foreground'>
            {currentStep + 1}/{steps.length}
          </span>{' '}
          {steps.map((step, index) => (
            <div
              key={index}
              className={`h-2 flex-grow ${index == 0 ? 'rounded-l-full' : ''} ${index == steps.length - 1 ? 'rounded-r-full' : ''
                } ${currentStep >= index ? 'bg-primary' : 'bg-muted'}`}
            ></div>
          ))}
        </div>
        <div className='space-y-4'>
          <h2 className='w-full mb-1 text-2xl font-semibold text-center'>
            {steps[currentStep].title}
          </h2>
          {renderStepContent(currentStep)}
        </div>
      </div>
      <div className='flex justify-between mt-6'>
        {currentStep > 0 && (
          <Button variant='outline' onClick={prevStep}>
            <ArrowLeft className='w-4 h-4 mr-2' /> Previous
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button
            onClick={nextStep}
            className='ml-auto'
            disabled={!isStepValid()}
          >
            Next <ArrowRight className='w-4 h-4 ml-2' />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className='ml-auto'
            disabled={!isStepValid()}
          >
            Create Case
          </Button>
        )}
      </div>
    </div>
  );
}
