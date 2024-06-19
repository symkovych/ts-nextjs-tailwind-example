import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Stack } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import '@/lib/env';

import '@/styles/globals.css';

import { FavoritesListing } from '@/components/Favorites';

export default function Favorites() {
  return (
    <main>
      <Head>
        <title>Favorite stocks</title>
      </Head>
      <Link href='/' className='underline'>
        <Stack mt={2} gap={1} direction='row'>
          <ArrowBackIcon /> Back to search page
        </Stack>
      </Link>
      <FavoritesListing />
    </main>
  );
}
