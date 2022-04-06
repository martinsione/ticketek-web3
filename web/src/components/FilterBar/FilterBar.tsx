/* eslint-disable no-return-assign */
import React from "react";
import { Flex, Input, Select } from "@chakra-ui/react";

export default function filterBar() {
  return (
    <div>
      <Flex
        alignItems="center"
        bg="gray.200"
        direction="row"
        h={50}
        justifyContent="space-evenly"
      >
        <Select
          bg="gray.100"
          borderRadius="30"
          name="category"
          p="10px"
          w="25%"
        >
          <option>ALL CATEGORIES</option>
          <option>Concerts</option>
          <option>Sports</option>
          <option>Theatre</option>
          <option>Family</option>
        </Select>

        <Input
          bg="gray.100"
          borderRadius="30"
          name="date"
          p="10px"
          placeholder="Enter your date"
          type="text"
          w="15%"
          onBlur={(e) => (e.target.type = "text")}
          onFocus={(e) => (e.target.type = "date")}
        />
        <Select bg="gray.100" borderRadius="30" name="city" p="10px" w="25%">
          <option>ALL CITIES</option>
          <option>Bogota</option>
          <option>Buenos Aires</option>
          <option>Cali</option>
          <option>Rosario</option>
        </Select>
      </Flex>
    </div>
  );
}
