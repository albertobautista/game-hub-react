import { HStack, Image, Text } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <HStack>
      <Image boxSize="60px" src="https://via.placeholder.com/100" alt="logo" />
      <Text>NavBar</Text>
    </HStack>
  );
};

export default NavBar;
