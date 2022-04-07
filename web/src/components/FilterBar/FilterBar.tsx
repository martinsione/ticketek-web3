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
  const handleDates = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value === "choose") {
      document.querySelector("#chooseDate").style.visibility = "visible";
    } else {
      document.querySelector("#chooseDate").style.visibility = "hidden";
    }
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
        {/* <Select
          bg="gray.100"
          borderRadius="30"
          defaultValue="All events..."
          name="category"
          p="10px"
          w="25%"
          onChange={handleCategories}
        >
          <option disabled style={{ color: "gray" }}>
            All events...
          </option> */}
        <CategoriesDropDown fn={handleCategories} />
        {/* </Select> */}

        <DatesDropDown fn={handleDates} />

        {/* <Select
          bg="gray.100"
          borderRadius="30"
          defaultValue="All dates..."
          name="category"
          p="10px"
          w="15%"
          onChange={handleDates}
        >
          <option value="all">All dates...</option>
          <option value="days">In a couple of days</option>
          <option value="weekend">This weekend</option>
          <option value="month">This month</option>
          <option value="choose">Choose a date</option>
        </Select>
        <input
          background-color="gray.100"
          border-radius="30"
          id="chooseDate"
          name="date"
          padding="10px"
          placeholder="Enter your date"
          style={{ visibility: "hidden" }}
          type="date"
          w="15%"
          // onBlur={(e) => (e.target.type = "text")}
          // onFocus={(e) => (e.target.type = "date")}
        /> */}
        {/* <Select
          bg="gray.100"
          borderRadius="30"
          defaultValue="All cities..."
          name="city"
          p="10px"
          w="25%"
          onChange={handleCities}
        >
          <option disabled style={{ color: "gray" }}>
            All cities...
          </option> */}
        <CitiesDropDown fn={handleCities} />
        {/* </Select> */}
      </Flex>
    </div>
  );
}
