import { HStack, Image, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image boxSize="60px" src="https://via.placeholder.com/100" alt="logo" />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
