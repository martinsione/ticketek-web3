import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@chakra-ui/react";

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

    // eslint-disable-next-line no-restricted-syntax
    for (const a of normalized) {
      query += `${a.toLowerCase()} `;
    }
    if (!search) return;
    if (router.pathname === "/search") {
      router.query.searchTerm = query.trim();
      router.reload();
    }
    router.push(`/search?searchTerm=${query.trim()}`);
  }

  return (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
      <Input
        _placeholder={{ color: "#fff" }}
        border="none"
        borderRadius="full"
        m="0"
        outline="none"
        placeholder="Search..."
        px="4"
        py="2"
        value={search}
        w="200"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
    </form>
  );
}

export default SearchBar;
