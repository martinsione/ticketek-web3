import { useSelector } from "react-redux";
import React from "react";
import { Select } from "@chakra-ui/react";

export default function CategoriesDropDown({ fn }) {
  const allCategories = useSelector((state) => state.events)
    .map((obj: { type: string }) => obj.type) // convierte el obj en arr
    .filter(
      (item: string, index: number, arr: []) => arr.indexOf(item) === index
    ) // filtra repeticiones);
    .sort();
  // Hola soy un cambio
  return (
    <Select
      bg="gray.100"
      borderRadius="30"
      defaultValue="All events..."
      name="category"
      p="10px"
      w="25%"
      onChange={fn}
    >
      <option disabled style={{ color: "gray" }}>
        All events...
      </option>
      {allCategories &&
        allCategories.map((type: string) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
    </Select>
  );
}
