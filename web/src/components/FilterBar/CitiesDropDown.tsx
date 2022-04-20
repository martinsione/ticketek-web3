import type { AppState } from "../../redux/store";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Select } from "@chakra-ui/react";

import { getCities } from "../../redux/actions";

export default function CitiesDropDown({ fn }: any) {
  const { cities, events } = useSelector((state: AppState) => state);
  const { query } = useRouter();

  const dispatch = useDispatch();

  const [cityQuery, setCityQuery] = useState(query.title); // Parece no tener sentido (title no existe), pero forza el render cuando cambia

  useEffect(() => {
    setCityQuery(query.city);
  }, []);

  useEffect(() => {
    if (!(cities as any).length) dispatch(getCities(events));
  }, [events]);

  return (
    <Select
      bg="#38665B"
      border="none"
      borderRadius="30"
      color="white"
      defaultValue="All cities..."
      name="city"
      onChange={fn}
    >
      <option style={{ backgroundColor: "#38665B" }} value="all">
        All cities...
      </option>
      {cities &&
        cities.map((city: string) => (
          <option
            key={city}
            selected={!!(cityQuery && cityQuery === city)}
            style={{ backgroundColor: "#38665B" }}
            value={city}
          >
            {city}
          </option>
        ))}
    </Select>
  );
}
