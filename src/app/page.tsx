import { Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import '@/lib/env';

import '@/styles/globals.css';

import { SearchStock } from '@/components/SearchStock';

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Main page </title>
      </Head>
      <Container maxWidth='sm' sx={{ mt: 2 }}>
        <Link href='/favorites' className='underline'>
          Check your favorite stocks
        </Link>
        <Stack gap={2} mt={2}>
          <Typography variant='h5'>
            Please type the stock symbol or name
          </Typography>
          <SearchStock />
        </Stack>
      </Container>
    </main>
  );
}
