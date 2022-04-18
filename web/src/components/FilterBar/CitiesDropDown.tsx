import type { AppState } from "../../redux/store";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Select } from "@chakra-ui/react";

import { getCities } from "../../redux/actions";

export default function CitiesDropDown({ fn }: any) {
  const {cities, events} = useSelector((state: AppState) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!events.length) dispatch(getCities());
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
      <option value="all">All cities...</option>
      {cities &&
        cities.map((city: string) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
    </Select>
  );
}
