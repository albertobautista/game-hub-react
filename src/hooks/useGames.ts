import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: {
    platform: Platform;
  }[];
  metacritic: number;
}
interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const getGames = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<FetchGamesResponse>("/games");
        setGames(response.data.results);
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setIsLoading(false);
      }
    };
    getGames();
    return () => controller.abort();
  }, []);

  return { games, error, isLoading };
};

export default useGames;
