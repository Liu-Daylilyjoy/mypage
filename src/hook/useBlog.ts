import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useBlog = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/blogs/${id}`, fetcher, {
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

export default useBlog;