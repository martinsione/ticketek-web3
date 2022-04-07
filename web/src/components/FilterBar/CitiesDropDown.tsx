import { useSelector } from "react-redux";
import React from "react";
import { Select } from "@chakra-ui/react";

export default function CitiesDropDown({ fn }) {
  const allCities = useSelector((state) => state.events)
    .map((obj: { city: string }) => obj.city) // convierte el obj en arr
    .filter(
      (item: string, index: number, arr: []) => arr.indexOf(item) === index
    ) // filtra repeticiones);
    .sort();
  return (
    <Select
      bg="gray.110"
      borderRadius="30"
      defaultValue="All cities..."
      name="city"
      p="10px"
      w="25%"
      onChange={fn}
    >
      <option disabled style={{ color: "gray" }}>
        All cities...
      </option>
      {allCities &&
        allCities.map((city: string) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
    </Select>
  );
}
