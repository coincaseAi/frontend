import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import VolatilityBadge from './VolatilityBadge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { availableTokens } from '@/constants/tokens';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useAccount, useReadContract } from 'wagmi';
import caseAbi from '@/config/caseAbi.json';
import { Badge } from './ui/badge';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CaseCard = ({ caseId }) => {
  const { address } = useAccount()

  const { data, isError, isLoading, isFetching, Error } = useReadContract({
    address: caseId,
    abi: caseAbi,
    account: address,
    functionName: 'getCaseInfo',
  });

  React.useEffect(() => {
    console.log(data)
    console.log(Error)
  }, [isFetching, Error]);

  if (isLoading) return <div>Loading case data...</div>;
  if (isError) return <div>Error loading case data</div>;
  if (!data) return <div>No data</div>;

  const [caseName, caseOwner, tokens, weights, paymentToken, subscriptionFees, isPublic] = data;



  return (
    caseOwner === address || isPublic ? <Card className="relative border border-transparent hover:border-muted">
      <CardHeader className="flex flex-row items-center justify-between p-0 space-y-0 ">
        <div className="flex items-center w-full gap-4">
          <Avatar className="w-16 h-16 rounded-lg ">
            <AvatarImage src={''} alt={caseName} className="rounded-lg" />
            <AvatarFallback className="rounded-lg">{caseName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-2' >
            <CardTitle >
              <Link href={`case/${caseId}`} passHref className='font-medium '>
                {caseName}
              </Link>
              {isPublic && <Badge variant={"secondary"} className="absolute text-green-500 bg-green-500/10 top-1 right-1 ">
                Free Access
              </Badge>}
            </CardTitle>
            <CardDescription>
              <div className="flex items-center space-x-1">
                <div className='flex -space-x-2'>
                  {tokens.slice(0, 3).map((asset, index) => {
                    const token = availableTokens.find(t => t.address === asset);
                    return (
                      <Avatar key={index} className="w-6 h-6 bg-white border-2 border-background ">
                        <AvatarImage src={token?.logoURI} alt={token?.symbol} />
                        <AvatarFallback>{token?.symbol.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    );
                  })}
                </div>
                {tokens.length > 3 && (
                  <div className="text-xs ">
                    +{tokens.length - 3}
                  </div>
                )}
                <span className="pl-2 text-xs text-muted-foreground">
                  {tokens.length} {tokens.length === 1 ? 'asset' : 'assets'}
                </span>
              </div>
            </CardDescription>
            {/* <CardDescription>{dummyData.description}</CardDescription> */}
          </div>
          {/* <div className="flex items-center w-20 h-10 ml-auto">
            <Line data={lineData} options={lineOptions} />
          </div> */}
        </div>
      </CardHeader>
      {/* <CardContent className="p-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-xs text-muted-foreground">Invested</span>
            <p className="text-base font-medium">${dummyData.invested?.toFixed(2)}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Value</span>
            <p className="text-base font-medium">${dummyData.value?.toFixed(2)}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Returns</span>
            <p className={`text-base font-medium ${dummyData.returns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {dummyData.returns >= 0 ? '+' : ''}{dummyData.returns?.toFixed(2)}%
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Volatility</span>
            <VolatilityBadge volatility={dummyData.volatility} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-2">

      </CardFooter> */}
    </Card> : null
  );
};

export default memo(CaseCard);