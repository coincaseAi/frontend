import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import VolatilityBadge from './VolatilityBadge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { availableTokens } from '@/constants/tokens';
import { Line } from 'react-chartjs-2';
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
import { mockCases } from '@/constants/mockData';
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

const MyCoinCaseCard = ({ caseId }) => {
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

  const dummyData = mockCases[0];
  const isPositive = dummyData.performance[0].value <= dummyData.performance[dummyData.performance.length - 1].value;
  const lineData = {
    labels: dummyData.performance.map(p => p.date),
    datasets: [{
      label: 'Performance',
      data: dummyData.performance.map(p => p.value),
      fill: false,
      borderColor: isPositive ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
      tension: 0.4,
      pointRadius: 0,
    }]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      line: { borderWidth: 2 },
      point: { radius: 0 }
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-2 space-y-0 ">
        <div className="flex items-center w-full gap-4">
          <Avatar className="w-12 h-12 rounded">
            <AvatarImage src={dummyData.avatar} alt={caseName} className="rounded" />
            <AvatarFallback className="rounded">{caseName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-2' >
            <CardTitle >
              <Link href={`/case/${caseId}`} passHref>
                {caseName}
              </Link>
              <Badge variant={isPublic ? "default" : "secondary"} className="ml-2">
                {isPublic ? "Public" : "Private"}
              </Badge>
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
          <div className="flex items-center w-20 h-10 ml-auto">
            <Line data={lineData} options={lineOptions} />
          </div>
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
    </Card>
  );
};

export default memo(MyCoinCaseCard);