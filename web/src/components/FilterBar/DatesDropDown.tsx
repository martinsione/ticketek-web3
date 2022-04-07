// import { useSelector } from "react-redux";
import React from "react";
import { Select } from "@chakra-ui/react";

export default function CategoriesDropDown({ fn }) {
  return (
    <>
      <Select
        bg="gray.100"
        borderRadius="30"
        defaultValue="All dates..."
        name="category"
        p="10px"
        w="15%"
        onChange={fn}
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
        placeholder="Enter your date"
        style={{ visibility: "hidden", padding: "10px", width: "15%" }}
        type="date"
        // onBlur={(e) => (e.target.type = "text")}
        // onFocus={(e) => (e.target.type = "date")}
      />
    </>
  );
}
