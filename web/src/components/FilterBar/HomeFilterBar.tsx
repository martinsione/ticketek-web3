import React from "react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";

import DatesDropDown from "./DatesDropDown";
import CitiesDropDown from "./CitiesDropDown";
import CategoriesDropDown from "./CategoriesDropDown";

export default function filterBar() {
  const router = useRouter();

  return (
    <div>
      <Flex
        alignItems="center"
        bg="gray.200"
        direction="row"
        h={50}
        justifyContent="space-evenly"
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
                    /* title: 'e.target[e.target.selectedIndex].innerText', */
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
      </Flex>
    </div>
  );
}
