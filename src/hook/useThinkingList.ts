import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useThinkingList = () => {
  const { data, error, isLoading } = useSWR("/api/thinkings", fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    data,
    error,
    isLoading
  };
}

export default useThinkingList;