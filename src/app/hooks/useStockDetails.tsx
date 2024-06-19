import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

import { MatchItem } from '@/app/hooks/useStocks';
import { apiKey, baseURL } from '@/constant/config';

type StockTimeItem = {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
};

type StockDetailsResponse = {
  data: {
    metadata: MatchItem;
    'Time Series (Daily)': { [key: string]: StockTimeItem };
  };
};

type StockParams = {
  symbol: string;
};

const getStocksDetails = (
  params?: StockParams
): Promise<StockDetailsResponse> =>
  axios.get('/query', {
    baseURL: baseURL,
    params: {
      apikey: apiKey,
      function: 'TIME_SERIES_DAILY',
      ...params,
    },
  });

export function useStockDetails(
  params?: StockParams,
  options?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getStocksDetails>>>
  >
) {
  return useQuery({
    queryKey: ['stocks-details', params],
    queryFn: () => getStocksDetails(params),
    ...options,
  });
}
