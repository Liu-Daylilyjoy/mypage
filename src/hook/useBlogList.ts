import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useBlogList = () => {
  const { data, error, isLoading } = useSWR("/api/blogs", fetcher, {
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

export default useBlogList;