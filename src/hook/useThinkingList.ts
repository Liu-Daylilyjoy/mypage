import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useThinkingList = () => {
  const { data, error, isLoading } = useSWR("/api/thinkings", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading
  };
}

export default useThinkingList;