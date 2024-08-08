import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosError, AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}
const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      const getData = async () => {
        try {
          setIsLoading(true);
          const response = await apiClient.get<FetchResponse<T>>(endpoint, {
            ...requestConfig,
          });
          setData(response.data.results);
        } catch (error) {
          setError((error as AxiosError).message);
        } finally {
          setIsLoading(false);
        }
      };
      getData();
      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;
