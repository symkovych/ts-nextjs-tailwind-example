'use client';
import { Alert, Grid } from '@mui/material';
import React, { useEffect } from 'react';

import { FavoriteItem } from '@/components/FavoriteItem';

import { MatchItem } from '@/app/hooks/useStocks';
import { favoritesKey } from '@/constant/config';

export function FavoritesListing() {
  const [favorites, setFavorites] = React.useState<MatchItem[] | null>(null);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem(favoritesKey) ?? '[]'));
  }, []);

  if (!favorites) return null;

  if (!favorites?.length)
    return <Alert severity='info'>You don't have any favorites</Alert>;

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {favorites.map((favorite) => (
        <Grid item xs={2} sm={4} md={4} key={favorite['1. symbol']} mt={3}>
          <FavoriteItem setFavorites={setFavorites} favorite={favorite} />
        </Grid>
      ))}
    </Grid>
  );
}
