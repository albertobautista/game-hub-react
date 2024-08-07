import { Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";

const GameGrid = () => {
  const { error, games, isLoading } = useGames();
  return (
    <>
      {error && <Text>{error}</Text>}
      {isLoading && <Text>Cargando...</Text>}
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
