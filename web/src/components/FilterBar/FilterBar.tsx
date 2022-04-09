import React from "react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";

import DatesDropDown from "./DatesDropDown";
import CitiesDropDown from "./CitiesDropDown";
import CategoriesDropDown from "./CategoriesDropDown";

export default function filterBar() {
  const router = useRouter();

  const handleCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    //
  };
  const handleDates = () => {
    console.log("HOLA");
  };
  const handleCities = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push(`/cities/${e.target.value}`);
  };
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
        <DatesDropDown fn={handleDates} />
        <CitiesDropDown fn={handleCities} />
      </Flex>
    </div>
  );
}
