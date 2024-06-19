'use client';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import * as React from 'react';
import '@/lib/env';

import { MatchItem, useStocks } from '@/app/hooks/useStocks';
import { favoritesKey } from '@/constant/config';

export function StockDetailsData() {
  const { stockName } = useParams<{ stockName: string }>();
  const decodeStockName = decodeURIComponent(stockName);
  const [favorites, setFavorites] = React.useState<MatchItem[]>([]);

  React.useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem(favoritesKey) ?? '[]'));
  }, []);

  const { data } = useStocks(
    { keywords: decodeStockName },
    { enabled: !!decodeStockName, staleTime: 10 * 60 * 1000 }
  );
  const stock = data?.data.bestMatches.find(
    (bestMatch) => bestMatch['2. name'] === decodeStockName
  );

  const addFavorite = () => {
    if (stock) {
      const updatedFavorite = [...favorites, stock];
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorite));
      setFavorites(updatedFavorite);
    }
  };

  const removeFavorite = () => {
    if (stock) {
      const updatedFavorites = favorites.filter(
        (savedFavorite) => savedFavorite['1. symbol'] !== stock['1. symbol']
      );
      setFavorites(updatedFavorites);
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    }
  };

  const mutateFavorite = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const isFavorite = favorites?.some(
    (favorite) => favorite['1. symbol'] === stock?.['1. symbol']
  );

  return (
    <Stack gap={2} flex={1}>
      <Stack direction='row' justifyContent='space-between' gap={2}>
        <Typography variant='h4'>{stock?.['1. symbol']}</Typography>
        <Button
          onClick={mutateFavorite}
          sx={{ minWidth: '250px' }}
          startIcon={isFavorite ? <StarIcon /> : <StarOutlineIcon />}
        >
          {isFavorite ? 'Remove from favorite' : 'Add to favorite'}
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
