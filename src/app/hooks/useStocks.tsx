import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

import { apiKey, baseURL } from '@/constant/config';

export type MatchItem = {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  '8. currency': string;
  '9. matchScore': string;
};

type SearchResponse = {
  data: {
    bestMatches: MatchItem[];
  };
};

type StockParams = {
  keywords: string;
};

const getStocks = (params?: StockParams): Promise<SearchResponse> =>
  axios.get('/query', {
    baseURL: baseURL,
    params: {
      apikey: apiKey,
      function: 'SYMBOL_SEARCH',
      ...params,
    },
  });

export function useStocks(
  params?: StockParams,
  options?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getStocks>>>>
) {
  return useQuery({
    queryKey: ['stocks', params],
    queryFn: () => getStocks(params),
    ...options,
  });
}
