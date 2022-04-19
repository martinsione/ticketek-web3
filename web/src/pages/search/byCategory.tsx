import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react";

import { AppState } from "../../redux/store";
import { filterEvents, getEvents } from "../../redux/actions";
import FilterBar from "../../components/FilterBar/FilterBar";
import DatesDropDown from "../../components/FilterBar/DatesDropDown";
import CitiesDropDown from "../../components/FilterBar/CitiesDropDown";
import CardPage from "../../components/CardPage/CardPage";

export default function index() {
  const { query } = useRouter();
  const dispatch = useDispatch();

  const [filterDate, setFilterDate] = useState("all");
  const [filterCity, setFilterCity] = useState("all");

  const { events } = useSelector((state: AppState) => state);
  useEffect(() => {
    if (!(events as any ).length) dispatch(getEvents());
  }, [events]);

  const categoryEvents = (events as any ).filter(
    (ev: any) => ev.metadata.type === query.cat,
    () => {}
  );

  const filteredEvents = useSelector((state: AppState) => state.filterEvents);

  useEffect(() => {
    dispatch(
      filterEvents(categoryEvents, {
        date: filterDate,
        city: filterCity,
        category: "all",
      })
    );
  }, [filterDate, filterCity]);

  function handleDate(
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    setFilterDate(`${e.target.value}`);
  }

  function handleCities(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterCity(e.target.value);
  }

  const displayTitle: any = query.cat;

  return (
    <>
      <Box>
        <Text borderBottom="2px" fontSize="3xl">
          {displayTitle}
        </Text>
        <FilterBar>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <DatesDropDown fn={handleDate} />
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <CitiesDropDown fn={handleCities} />
        </FilterBar>
      </Box>
      {(filteredEvents as any).length ? (
        <CardPage data={(filteredEvents as any)   } />
      ) : (
        <Box textAlign="center">
          There are no{" "}
          {query.cat !== "all" &&
            typeof query.cat === "string" &&
            query.cat.toLowerCase()}{" "}
          events {filterCity !== "all" && `for ${filterCity}`} on these dates
        </Box>
      )}
    </>
  );
}
