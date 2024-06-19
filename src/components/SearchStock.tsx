'use client';
import { CircularProgress, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import * as React from 'react';
import { useDebounce } from 'use-debounce';
import '@/lib/env';

import { MatchItem, useStocks } from '@/app/hooks/useStocks';

export function SearchStock() {
  const [keywords, setKeywords] = React.useState('');
  const [debouncedKeywords] = useDebounce(keywords, 500);
  const { data, isLoading } = useStocks(
    { keywords: debouncedKeywords },
    { enabled: !!debouncedKeywords, staleTime: 10 * 60 * 1000 }
  );
  const [selectedStock, setSelectedStock] = React.useState<null | MatchItem>(
    null
  );

  return (
    <Stack gap={2}>
      <Autocomplete
        inputValue={keywords}
        getOptionKey={(option) => option?.['1. symbol'] || ''}
        getOptionLabel={(option) => option?.['2. name'] || ''}
        isOptionEqualToValue={(option, value) =>
          option?.['1. symbol'] === value?.['1. symbol']
        }
        loading={isLoading}
        options={data?.data?.bestMatches ?? []}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              id='cardDefinition'
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              placeholder='--'
            />
          );
        }}
        value={selectedStock}
        onChange={(_, value) => {
          setSelectedStock(value);
        }}
        onInputChange={(_, value) => setKeywords(value)}
      />
      {selectedStock && (
        <Link
          className='underline'
          href={{
            pathname: `/stock/${selectedStock['2. name']}`,
          }}
        >
          Check the stock details
        </Link>
      )}
    </Stack>
  );
}
