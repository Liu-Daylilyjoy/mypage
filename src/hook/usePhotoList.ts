import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const usePhotoList = () => {
  const { data, error, isLoading } = useSWR("/api/photos", fetcher, {
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

export default usePhotoList;