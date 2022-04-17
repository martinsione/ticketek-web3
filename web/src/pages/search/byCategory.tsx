import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

import { AppState } from "../../redux/store";
import { filterEvents, getEvents } from "../../redux/actions";
import FilterBar from "../../components/FilterBar/FilterBar";
import DatesDropDown from "../../components/FilterBar/DatesDropDown";
import CitiesDropDown from "../../components/FilterBar/CitiesDropDown";
import CardPage from "../../components/CardPage/CardPage";

// type Props = {};

export default function index() {
  const { query } = useRouter(); //  query.cat
  const dispatch = useDispatch();

  const [filterDate, setFilterDate] = useState("all");
  const [filterCity, setFilterCity] = useState("all");

  const filteredEvents = useSelector((state: AppState) => state.filterEvents);

  useEffect(() => {
    dispatch(getEvents());
  }, []);
  const allEvents = useSelector((state: AppState) => state.events).filter(
    (ev: any) => ev.metadata.type === query.cat
  );
  console.log(
    "🚀 ~ file: byCategory.tsx ~ line 30 ~ index ~ allEvents",
    allEvents
  );

  useEffect(() => {
    dispatch(
      filterEvents(allEvents, {
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
      <FilterBar>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <DatesDropDown fn={handleDate} />
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <CitiesDropDown fn={handleCities} />
      </FilterBar>
      {filteredEvents.length ? (
        <CardPage data={filteredEvents} title={displayTitle} />
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
