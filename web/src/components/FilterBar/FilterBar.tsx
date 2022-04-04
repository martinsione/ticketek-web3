import React from "react";
import { Flex, Input, Select } from "@chakra-ui/react";

export default function filterBar() {
  // const dateInput = useRef();
  return (
    <div>
      <Flex
        alignItems="center"
        direction="row"
        h={50}
        justifyContent="space-evenly"
        bg="gray.200"
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
          // ref={dateInput}
          type="date"
          w="15%"
          // onBlur={() => (dateInput.current.type = "text")}
          // onFocus={() => (dateInput.current.type = "date")}
          // onFocus="(this.type='date')"
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
