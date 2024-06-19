import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Stack } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import '@/lib/env';

import '@/styles/globals.css';

import { StockChart } from '@/components/StockChart';
import { StockDetailsData } from '@/components/StockDetails';

export default function StockDetails() {
  return (
    <main>
      <Head>
        <title>Stock details</title>
      </Head>
      <Link href='/' className='underline'>
        <Stack mt={2} gap={1} direction='row'>
          <ArrowBackIcon /> Back to search page
        </Stack>
      </Link>
      <Stack alignItems='center'>
        <Stack
          justifyContent='center'
          alignItems='center'
          direction={{ xs: 'column', md: 'row' }}
          mt={2}
          gap={2}
          sx={{ maxWidth: '80%' }}
        >
          <StockDetailsData />
          <StockChart />
        </Stack>
      </Stack>
    </main>
  );
}
