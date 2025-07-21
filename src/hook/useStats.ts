import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

interface VisitData {
  page: string;
  count: number;
}

interface StatsData {
  blogs: number;
  thinkings: number;
  photos: number;
  visitStats: VisitData[];
}

const useStats = () => {
  const { data, error, isLoading, mutate } = useSWR<StatsData>('/api/stats', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
    mutate
  };
};

export default useStats; 