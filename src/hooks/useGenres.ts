import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

interface Genre {
  id: number;
  name: string;
}

export interface FetchGenresResponse {
  count: number;
  results: Genre[];
}
const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const getGenres = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<FetchGenresResponse>("/genres");
        setGenres(response.data.results);
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setIsLoading(false);
      }
    };
    getGenres();
    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenres;
