import { IoIosSearch } from "react-icons/io";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { Flex, IconButton, Input } from "@chakra-ui/react";

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
    <Flex alignItems="center" flexDirection="row" h={70}>
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <Flex alignItems="center" flexDirection="row" h={70}>
          <Flex
            alignItems="center"
            bg="gray.200"
            borderRadius="30"
            h={50}
            justifyContent="space-around"
            w={400}
          >
            <Input
              placeholder="Buscar eventos, escenarios o artistas"
              value={search}
              w="200"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
              <IconButton aria-label='Search' bg="none" fontSize="1.5rem" icon={<IoIosSearch />} type="submit" />
          </Flex>
          {/* <Input marginRight={50} type="submit" w={150} /> */}
        </Flex>
      </form>
    </Flex>
  );
}

export default SearchBar;
