import { Box, Button, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { GameQuery } from "../App";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

interface GameGridProps {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: GameGridProps) => {
  const {
    error,
    data: games,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGames(gameQuery);
  const skeletons = Array.from({ length: 12 });

  if (error) return <Text>{error.message}</Text>;

  const dataLength =
    games?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  console.log(dataLength);
  return (
    <InfiniteScroll
      dataLength={dataLength}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<Spinner />}
    >
      <SimpleGrid
        columns={{
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4,
        }}
        spacing={6}
        padding="10px"
      >
        {isLoading &&
          skeletons.map((_, index) => (
            <GameCardContainer key={index}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {games?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((game) => (
              <GameCardContainer key={`${game.id}-${game.name}`}>
                <GameCard game={game} />
              </GameCardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default GameGrid;
