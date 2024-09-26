'use client';
import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { caseFactoryAddress } from '@/constants/mockData';
import abi from '@/config/abi.json';
import { Skeleton } from '@/components/ui/skeleton';
import CaseCard from './CaseCard';

const CreatorsList = () => {
  const [creators, setCreators] = useState([]);
  const { address } = useAccount();

  const {
    data: creatorsData,
    isError,
    isLoading,
  } = useReadContract({
    address: caseFactoryAddress,
    abi: abi,
    functionName: 'getAllCreators',
  });

  useEffect(() => {
    if (creatorsData) {
      setCreators(creatorsData);
      console.log(creatorsData);
    }
  }, [creatorsData]);

  if (isLoading) {
    return [...Array(5)].map((_, index) => (
      <div key={index} className='flex items-center mb-4 space-x-4'>
        <Skeleton className='w-12 h-12 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[200px]' />
          <Skeleton className='h-4 w-[150px]' />
        </div>
      </div>
    ));
  }

  if (isError) {
    return <div>Error fetching creators</div>;
  }

  return creators.length === 0 ? (
    <p>No creators found</p>
  ) : (
    creators
      .filter((creator) => creator !== address)
      .map((creator, index) => (
        <div key={creator} className='flex flex-col gap-2'>
          {/* <div className="hover:no-underline">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarFallback>
                                    {creator.slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{`${creator.slice(0, 6)}...${creator.slice(-4)}`}</p>
                                <p className="text-sm text-muted-foreground">Creator #{index + 1}</p>
                            </div>
                        </div>
                    </div>
                    <div> */}
          <CreatorCases creatorAddress={creator} />
          {/* </div> */}
        </div>
      ))
  );
};

const CreatorCases = ({ creatorAddress }) => {
  const [cases, setCases] = useState([]);

  const {
    data: casesData,
    isError,
    isLoading,
  } = useReadContract({
    address: caseFactoryAddress,
    abi: abi,
    functionName: 'getCasesByCreator',
    args: [creatorAddress],
  });

  useEffect(() => {
    if (casesData) {
      setCases(casesData);
    }
  }, [casesData]);

  if (isLoading)
    return (
      <p className='p-2 rounded-md text-muted-foreground bg-muted'>
        Loading cases...
      </p>
    );
  if (isError)
    return (
      <p className='p-2 rounded-md text-muted-foreground bg-muted'>
        Error fetching cases
      </p>
    );

  return (
    <div className='flex flex-col gap-2 mt-2'>
      {cases.length === 0 ? (
        <p>No cases created</p>
      ) : (
        cases.map((caseAddress, index) => (
          <div key={caseAddress}>
            {/* <p className="font-medium">Case #{index + 1}</p>
                        <p className="text-sm text-muted-foreground">{`${caseAddress.slice(0, 6)}...${caseAddress.slice(-4)}`}</p> */}

            <CaseCard caseId={caseAddress} key={caseAddress} />
          </div>
        ))
      )}
    </div>
  );
};

export default CreatorsList;
