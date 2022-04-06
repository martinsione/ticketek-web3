import { Flex, Image, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const normalized = search
      .trim()
      .split(" ")
      .map((element) => element.toLowerCase());
    let query = "";
    for (let a of normalized) {
      query += a.toLowerCase() + " ";
    }
    if (!search) return;
    if (router.pathname === "/search") {
      router.query.searchTerm = query.trim();
      router.reload();
    }
    router.push(`http://localhost:3000/search?searchTerm=${query.trim()}`);
  }
  return (
    <Flex flexDirection={"row"} h={70} alignItems="center">
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <Flex flexDirection={"row"} h={70} alignItems="center">
          <Flex
            alignItems="center"
            bg="gray.200"
            borderRadius="30"
            h={50}
            justifyContent="flex-start"
            w={400}
          >
            <Image alt="search" marginLeft={30} src="/searchIcon.svg" w={19} />
            <Input
              placeholder="Buscar eventos, escenarios o artistas"
              w="200"
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
          </Flex>
          <Input type={"submit"} w={150} marginRight={50} />
        </Flex>
      </form>
    </Flex>
  );
}

export default SearchBar;
