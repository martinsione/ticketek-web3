import { Flex, Image, Input } from "@chakra-ui/react";

const SearchBar = () => {
  return (
    <Flex
      bg="gray.200"
      w={400}
      h={50}
      borderRadius="30"
      alignItems="center"
      justifyContent="flex-start"
      marginRight={200}
    >
      <Image src="/searchIcon.svg" alt="search" w={19} marginLeft={30} />
      <Input placeholder="Search" w="200" />
    </Flex>
  );
};

export default SearchBar;
