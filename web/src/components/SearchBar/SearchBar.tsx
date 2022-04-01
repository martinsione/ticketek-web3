import { Flex, Image, Input } from "@chakra-ui/react";

function SearchBar() {
  return (
    <Flex
      alignItems="center"
      bg="gray.200"
      borderRadius="30"
      h={50}
      justifyContent="flex-start"
      marginRight={200}
      w={400}
    >
      <Image alt="search" marginLeft={30} src="/searchIcon.svg" w={19} />
      <Input placeholder="Buscar eventos, escenarios o artistas" w="200" />
    </Flex>
  );
}

export default SearchBar;
