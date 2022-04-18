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
            e.target.value !== "choose"
              ? router.push({
                  pathname: "/search/byDate",
                  query: { opt: e.target.value },
                })
              : router.push({
                  pathname: "/search/byDate",
                  query: { opt: "choose", date: e.target.value }, //  Next envia  el query opt: e.target.value... Raro!
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
