import type { AppState } from "../../redux/store";

import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react";

import { filterEvents, getEvents } from "../../redux/actions";
import dateFilter from "../../components/Functional Components/dateFilter";
import FilterBar from "../../components/FilterBar/FilterBar";
import CitiesDropDown from "../../components/FilterBar/CitiesDropDown";
import CategoriesDropDown from "../../components/FilterBar/CategoriesDropDown";
import CardPage from "../../components/CardPage/CardPage";

export default function byDate() {
  const { query } = useRouter();

  const dispatch = useDispatch();

  const [filterCategory, setFilterCategory] = useState("all");
  const [filterCity, setFilterCity] = useState("all");

  const filteredEvents = useSelector((state: AppState) => state.filterEvents);
  const { events } = useSelector((state: AppState) => state);

  useEffect(() => {
    if (!events.length) dispatch(getEvents());
  }, [events]);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const dateEvents = dateFilter(
    useSelector((state: AppState) => state.events),
    query.opt
  );

  useEffect(() => {
    dispatch(
      filterEvents(dateEvents as [], {
        date: "all",
        city: filterCity,
        category: filterCategory,
      })
    );
  }, [filterCategory, filterCity]);

  function handleCategories(
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    setFilterCategory(e.target.value);
  }

  function handleCities(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterCity(e.target.value);
  }

  const displayTitle = query.title
    ? query.title
    : typeof query.opt === "string" && new Date(query.opt).toDateString();

  return (
    <>
      <Box>
        <Text borderBottom="2px" fontSize="3xl">
          {displayTitle}
        </Text>
        <FilterBar>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <CategoriesDropDown fn={handleCategories} />
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <CitiesDropDown fn={handleCities} />
        </FilterBar>
      </Box>
      {filteredEvents.length ? (
        <CardPage data={filteredEvents} />
      ) : (
        <Box textAlign="center">
          There are no{" "}
          {filterCategory !== "all" && filterCategory.toLowerCase()} events{" "}
          {filterCity !== "all" && `for ${filterCity}`} on these dates
        </Box>
      )}
    </>
  );
}
