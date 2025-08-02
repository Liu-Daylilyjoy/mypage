import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const usePhotoList = () => {
  const { data, error, isLoading } = useSWR("/api/photos", fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    data,
    error,
    isLoading
  };
};

export default usePhotoList;