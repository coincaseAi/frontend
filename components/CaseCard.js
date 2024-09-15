'use client';

import React, { memo } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import VolatilityBadge from './VolatilityBadge';
import { Bookmark, Users } from 'lucide-react';
import Link from 'next/link';
import { availableTokens } from '@/constants/tokens';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const CaseCard = ({ caseData, onToggleWatchlist, isWatchlisted }) => {
  const {
    id,
    name,
    description,
    assets,
    returns,
    subscribers,
    creator,
    volatility,
    performance,
    isSubscribed,
  } = caseData;

  const isPositive =
    performance[0].value <= performance[performance.length - 1].value;

  const lineData = {
    labels: performance.map((p) => p.date),
    datasets: [
      {
        label: 'Performance',
        data: performance.map((p) => p.value),
        fill: false,
        borderColor: isPositive ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
      },
    },
  };

  return (
    <Card className='w-full relative transition-all   duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg'>
      <CardContent className='flex flex-col gap-4 p-3 group'>
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation when clicking the bookmark
            onToggleWatchlist(caseData.id);
          }}
          className='absolute z-50 transition-colors -top-1 right-3 text-primary hover:text-primary-dark'
        >
          <Bookmark
            className={`w-6 h-6 ${
              isWatchlisted
                ? 'fill-primary stroke-primary'
                : 'stroke-muted-foreground  group-hover:visible lg:invisible'
            }`}
          />
        </button>
        {isSubscribed && (
          <div
            variant='secondary'
            className='text-[10px] rounded-b absolute top-0 right-10 px-2 py-1 z-50 font-medium uppercase text-green-500 pointer-events-none bg-green-500/20'
          >
            Subscribed
          </div>
        )}

        <div className='flex gap-2 '>
          <Avatar className='w-12 h-12 rounded'>
            <AvatarImage src={creator.avatar} alt={name} className='rounded' />
            <AvatarFallback className='rounded'>
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='flex-grow md:pr-4'>
            <div className='flex items-center gap-1'>
              <CardTitle className=''>
                <Link href={`/home/case/${id}`} className='hover:underline'>
                  {name}
                </Link>
              </CardTitle>
            </div>
            <div className='mt-2 text-sm text-muted-foreground'>
              {description}
            </div>
          </div>
        </div>
        {/* <div className="mb-4">
                    <div className="flex w-full h-6 overflow-hidden rounded-md">
                        {assets.map((asset, index) => (
                            <div
                                key={index}
                                style={{
                                    width: `${asset.weightage}%`,
                                    backgroundColor: colors[index % colors.length]
                                }}
                                className="h-full"
                                title={`${asset.currency}: ${asset.weightage}%`}
                            />
                        ))}
                    </div>
                    <div className="flex flex-wrap mt-2">
                        {assets.map((asset, index) => (
                            <div key={index} className="flex items-center mb-1 mr-3">
                                <div
                                    className="w-2 h-2 mr-1 rounded-full"
                                    style={{ backgroundColor: colors[index % colors.length] }}
                                />
                                <span className="text-xs">{asset.currency}: {asset.weightage}%</span>
                            </div>
                        ))}
                    </div>
                </div> */}
        <div className='flex items-center justify-between w-full gap-1 '>
          <div className='flex flex-col text-sm font-medium'>
            <span className='text-[10px] font-light text-muted-foreground'>
              Subscribers
            </span>
            <div className='flex items-center gap-1'>
              <Users className='inline-block w-3 h-3' />
              {subscribers}
            </div>
          </div>
          <div className='flex flex-col text-sm font-medium'>
            <span className='text-[10px] font-light text-muted-foreground'>
              1 day ROI
            </span>
            <span
              className={`text-xs ${
                returns >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {returns >= 0 ? '+' : ''}
              {returns}%
            </span>
          </div>
          <div className='flex items-center w-20 h-10 '>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
        <div className='flex items-center justify-between gap-2 '>
          <span className={`text-xs flex items-center gap-1`}>
            <Avatar className='w-6 h-6'>
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {creator.name}
          </span>
          <VolatilityBadge volatility={volatility} />
        </div>

        {/* New section for involved assets */}
        <div className='flex items-center space-x-1'>
          <div className='flex -space-x-2'>
            {assets.slice(0, 3).map((asset, index) => {
              const token = availableTokens.find(
                (t) => t.symbol === asset.currency
              );
              return (
                <Avatar
                  key={index}
                  className='w-6 h-6 bg-white border-2 border-background '
                >
                  <AvatarImage src={token?.logoURI} alt={asset.currency} />
                  <AvatarFallback>{asset.currency.slice(0, 2)}</AvatarFallback>
                </Avatar>
              );
            })}
          </div>
          {assets.length > 3 && (
            <div className='text-xs '>+{assets.length - 3}</div>
          )}
          <span className='pl-2 text-xs text-muted-foreground'>
            {assets.length} {assets.length === 1 ? 'asset' : 'assets'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(CaseCard);
