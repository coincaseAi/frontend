'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { CreateCaseDrawer } from './components/CreateCaseDrawer';
import { Button } from '@/components/ui/button';
import { Loader, Loader2, Plus, RefreshCcw } from 'lucide-react';
import { useAccount, useReadContract } from 'wagmi';
import { caseFactoryAddress } from '@/constants/mockData';
import abi from '@/config/abi.json';
import MyCoinCaseCard from '@/components/MyCoinCaseCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function MyCoincasesPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const { address } = useAccount();

  const {
    data: userCases,
    isError,
    isFetching,
    Error,
    refetch,
  } = useReadContract({
    address: caseFactoryAddress,
    abi: abi,
    functionName: 'getCasesByCreator',
    args: [address],
    enabled: !!address,
  });

  useEffect(() => {
    console.log(Error);
  }, [isError]);

  const skeletons = useMemo(
    () => (
      <>
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className='h-[64px] w-full ' />
        ))}
      </>
    ),
    []
  );

  const caseCards = useMemo(
    () =>
      userCases?.map((caseData) => (
        <MyCoinCaseCard key={caseData.id} caseId={caseData} />
      )),
    [userCases]
  );

  return (
    <>
      <div className='flex gap-1 mb-3'>
        <div className='flex flex-col gap-0.5 mb-4'>
          <h1 className='text-2xl font-semibold '>My Cases</h1>
          <p className='text-sm text-muted'>Cases created by you</p>
        </div>
        <Button
          size='icon'
          className='ml-auto'
          disabled={isFetching}
          onClick={refetch}
        >
          {isFetching ? (
            <Loader className='w-4 h-4 animate-spin' />
          ) : (
            <RefreshCcw className='w-4 h-4' />
          )}
        </Button>
        <Button size='icon' onClick={openDrawer}>
          <Plus className='w-4 h-4' />
        </Button>
      </div>
      <div className='container mx-auto'>
        <CreateCaseDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
        <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
          {isFetching ? (
            skeletons
          ) : isError ? (
            <div>Error fetching user cases</div>
          ) : userCases?.length ? (
            caseCards
          ) : (
            <div>No cases found</div>
          )}
        </div>
      </div>{' '}
    </>
  );
}
