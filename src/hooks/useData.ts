import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}
const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<FetchResponse<T>>(endpoint);
        setData(response.data.results);
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default useData;
