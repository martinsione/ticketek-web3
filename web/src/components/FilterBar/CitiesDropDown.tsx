import type { AppState } from "../../redux/store";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Select } from "@chakra-ui/react";

import { getCities } from "../../redux/actions";

export default function CitiesDropDown({ fn }) {
  const allCities = useSelector((state: AppState) => state.cities);
  console.log(
    "🚀 ~ file: CitiesDropDown.tsx ~ line 12 ~ CitiesDropDown ~ allCities",
    allCities
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCities());
  }, []);

  return (
    <Select
      bg="gray.100"
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
