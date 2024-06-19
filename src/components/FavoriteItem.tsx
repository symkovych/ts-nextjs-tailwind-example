import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

import { MatchItem } from '@/app/hooks/useStocks';
import { favoritesKey } from '@/constant/config';

export function FavoriteItem({
  favorite,
  setFavorites,
}: {
  favorite: MatchItem;
  setFavorites: React.Dispatch<React.SetStateAction<MatchItem[] | null>>;
}) {
  const removeFavorite = () => {
    const favorites: MatchItem[] = JSON.parse(
      localStorage.getItem(favoritesKey) ?? '[]'
    );
    const updatedFavorites = favorites.filter(
      (savedFavorite) => savedFavorite['1. symbol'] !== favorite['1. symbol']
    );
    setFavorites(updatedFavorites);
    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent sx={{ p: 0 }}>
        <Typography variant='h6'>{favorite['2. name']}</Typography>
        <Typography>{favorite['1. symbol']}</Typography>
      </CardContent>

      <Button fullWidth onClick={removeFavorite}>
        Remove from favorite
      </Button>
    </Card>
  );
}
