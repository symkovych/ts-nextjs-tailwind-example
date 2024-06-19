'use client';
import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useParams } from 'next/navigation';
import * as React from 'react';
import '@/lib/env';

import { useStockDetails } from '@/app/hooks/useStockDetails';
import { useStocks } from '@/app/hooks/useStocks';

export function StockChart() {
  const { stockName } = useParams<{ stockName: string }>();
  const decodeStockName = decodeURIComponent(stockName);
  const { data } = useStocks(
    { keywords: decodeStockName },
    { enabled: !!decodeStockName, staleTime: 10 * 60 * 1000 }
  );
  const stock = data?.data.bestMatches[0];
  const stockSymbol = stock?.['1. symbol'] ?? '';

  const { data: stockDetailsData } = useStockDetails(
    { symbol: stockSymbol },
    { enabled: !!stockSymbol }
  );
  const timeData = Object.keys(
    stockDetailsData?.data['Time Series (Daily)'] ?? {}
  ).slice(0, 20);
  const seriesData = Object.values(
    stockDetailsData?.data['Time Series (Daily)'] ?? {}
  )
    .map((timeData) => +timeData['1. open'])
    .slice(0, 20);
  const minYAxis = Math.min(...seriesData);

  return (
    <Box display='flex' flex={1}>
      <LineChart
        xAxis={[{ scaleType: 'point', data: timeData }]}
        yAxis={[{ min: minYAxis }]}
        series={[
          {
            data: seriesData,
            area: true,
          },
        ]}
        width={400}
        height={300}
      />
    </Box>
  );
}
