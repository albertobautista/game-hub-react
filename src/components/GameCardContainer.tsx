import { Box } from "@chakra-ui/react";

interface GameCardContainerProps {
  children: React.ReactNode;
}
const GameCardContainer = ({ children }: GameCardContainerProps) => {
  return (
    <Box borderRadius="10px" overflow="hidden" width="300px">
      {children}
    </Box>
  );
};

export default GameCardContainer;
