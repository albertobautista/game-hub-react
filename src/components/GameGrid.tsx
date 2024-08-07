import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";
import { Text } from "@chakra-ui/react";

interface Game {
  id: number;
  name: string;
  background_image: string;
}
interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await apiClient.get<FetchGamesResponse>("/games");
        console.log(response.data);
        setGames(response.data.results);
      } catch (error) {
        setError((error as AxiosError).message);
      }
    };
    getGames();
  }, []);

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {/* <img src={game.background_image} alt={game.name} /> */}
            <p>{game.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
