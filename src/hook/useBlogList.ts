import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useBlogList = () => {
  const { data, error, isLoading } = useSWR("/api/blogs", fetcher, {
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

export default useBlogList;