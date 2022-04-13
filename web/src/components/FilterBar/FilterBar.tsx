import React from "react";
import { useRouter } from "next/router";
import { Flex, Select } from "@chakra-ui/react";

import CitiesDropDown from "./citiesDropDown";
import DatesDropDown from "./DatesDropDown";
import CategoriesDropDown from "./CategoriesDropDown";

export default function filterBar() {
  const router = useRouter();

  const handleCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    //
  };
  // const handleDates = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  // };
  // const handleCities = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   router.push(`/cities/${e.target.value}`);
  // };
  return (
    <div>
      <Flex
        alignItems="center"
        bg="gray.200"
        direction="row"
        h={50}
        justifyContent="space-evenly"
      >
        <CategoriesDropDown fn={handleCategories} />
        <DatesDropDown
          fn={(e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.value !== "choose"
              ? router.push({
                  pathname: "/search/byDate",
                  query: { opt: e.target.value },
                })
              : router.push({
                  pathname: "/search/byDate",
                  query: { opt: "choose", date: e.target.value },
                })
          }
        />
        <CitiesDropDown
          fn={(e: React.ChangeEvent<HTMLInputElement>) =>
            router.push(`/cities/${e.target.value}`)
          }
        />
      </Flex>
    </div>
  );
}
