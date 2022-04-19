import React from "react";
import { useRouter } from "next/router";
import { Stack } from "@chakra-ui/react";

import DatesDropDown from "./DatesDropDown";
import CitiesDropDown from "./CitiesDropDown";
import CategoriesDropDown from "./CategoriesDropDown";

export default function filterBar() {
  const router = useRouter();

  return (
    <Stack
      alignItems="baseline"
      direction="row"
      gap="2rem"
      h={50}
      justify="space-around"
      m="auto"
      maxW="1276px"
      mt="0.5rem"
    >
      <CategoriesDropDown
        fn={(e: React.ChangeEvent<HTMLSelectElement>) =>
          router.push({
            pathname: "/search/byCategory",
            query: { cat: e.target.value },
          })
        }
      />
      <DatesDropDown
        fn={(
          e:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>
        ) =>
          e.target.id === "presetDate"
            ? router.push({
              pathname: "/search/byDate",
              query: {
                opt: e.target.value,
                // @ts-ignore
                title: e.target[e.target.selectedIndex].innerText,
              },
            })
            : router.push({
              pathname: "/search/byDate",
              query: { opt: e.target.value },
            })
        }
      />
      <CitiesDropDown
        fn={(e: React.ChangeEvent<HTMLInputElement>) =>
          router.push(`/search/${e.target.value}`)
        }
      />
    </Stack>
  );
}
