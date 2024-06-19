'use client';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import * as React from 'react';
import '@/lib/env';

import { useStocks } from '@/app/hooks/useStocks';
import { favoritesKey } from '@/constant/config';

export function StockDetailsData() {
  const { stockName } = useParams<{ stockName: string }>();
  const decodeStockName = decodeURIComponent(stockName);
  const { data } = useStocks(
    { keywords: decodeStockName },
    { enabled: !!decodeStockName, staleTime: 10 * 60 * 1000 }
  );
  const stock = data?.data.bestMatches.find(
    (bestMatch) => bestMatch['2. name'] === decodeStockName
  );

  const addFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) ?? '[]');
    favorites.push(stock);
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
  };

  return (
    <Stack gap={2} flex={1}>
      <Stack direction='row' justifyContent='space-between' gap={2}>
        <Typography variant='h4'>{stock?.['1. symbol']}</Typography>
        <Button
          onClick={addFavorite}
          sx={{ maxWidth: '200px' }}
          startIcon={<StarOutlineIcon />}
        >
          Add to favorite
        </Button>
      </Stack>
      <Divider />
      <Typography>
        Market working hours: {stock?.['5. marketOpen']} -{' '}
        {stock?.['6. marketClose']}
      </Typography>
      <Typography>Stock name: {stock?.['2. name']}</Typography>
      <Typography>Region: {stock?.['4. region']}</Typography>
      <Typography>Currency: {stock?.['8. currency']}</Typography>
    </Stack>
  );
}
