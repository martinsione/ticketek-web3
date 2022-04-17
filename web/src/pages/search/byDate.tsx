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

// type Props = {};

export default function byDate() {
  const { query } = useRouter(); //  query.opt
  const dispatch = useDispatch();

  const [filterCategory, setFilterCategory] = useState("all");
  const [filterCity, setFilterCity] = useState("all");

  const filteredEvents = useSelector((state: AppState) => state.filterEvents);

  useEffect(() => {
    dispatch(getEvents());
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const allEvents = dateFilter(
    useSelector((state: AppState) => state.events),
    query.opt
  );

  useEffect(() => {
    dispatch(
      filterEvents(allEvents as [], {
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

  const displayTitle: any = query.opt;

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

export function dateFilterXXX(events: [], option: any) {
  return events.filter((ev: any) => {
    const { date } = ev.metadata;
    let filter: boolean; // switch asigna filter, que se retorna a la salida
    switch (option) {
      case "all": {
        filter = true;
        break;
      }
      case "days": {
        const coupleOfDays = new Date(
          new Date().setDate(new Date().getDate() + 3)
        );
        filter = date > new Date() && date < coupleOfDays;
        break;
      }
      case "week": {
        const week = new Date(new Date().setDate(new Date().getDate() + 8));
        filter = date > new Date() && date < week;
        break;
      }
      case "weekend": {
        const fridayDay = new Date().getDate() + (4 - new Date().getDay() + 1);
        const fridayDate = new Date(new Date().setDate(fridayDay));

        const saturdayDay =
          new Date().getDate() + (5 - new Date().getDay() + 1);
        const saturdayDate = new Date(new Date().setDate(saturdayDay));

        const sundayDay = new Date().getDate() + (6 - new Date().getDay() + 1);
        const sundayDate = new Date(new Date().setDate(sundayDay));

        filter =
          date > new Date() &&
          (date.toDateString() === fridayDate.toDateString() ||
            date.toDateString() === saturdayDate.toDateString() ||
            date.toDateString() === sundayDate.toDateString());
        break;
      }
      case "month": {
        const oneMonth = new Date(
          new Date().setMonth(new Date().getMonth() + 1)
        );
        filter = date > new Date() && date < oneMonth;
        break;
      }
      default: {
        const chosenDate = new Date(`${option}Z`); // Raro, toma el dia anterior !!!
        chosenDate.setDate(chosenDate.getDate() + 1); //  Acá la corrijo
        filter = date.toDateString() === chosenDate.toDateString();
      }
    }
    return filter;
  });
}
