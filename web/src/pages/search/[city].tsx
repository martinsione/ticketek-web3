import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

import { AppState } from "../../redux/store";
import { filterEvents, getEvents } from "../../redux/actions";
import FilterBar from "../../components/FilterBar/FilterBar";
import DatesDropDown from "../../components/FilterBar/DatesDropDown";
import CategoriesDropDown from "../../components/FilterBar/CategoriesDropDown";
import CardPage from "../../components/CardPage/CardPage";

export default function City({ city }: { city: string }) {
  const dispatch = useDispatch();

  const [filterDate, setFilterDate] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const { events } = useSelector((state: AppState) => state);
  const cityEvents = (events as any ).filter((ev: any) => ev.place === city);

  useEffect(() => {
    if (!(events as any ).length) dispatch(getEvents());
  }, [events]);

  const filteredEvents = useSelector((state: AppState) => state.filterEvents);

  useEffect(() => {
    dispatch(
      filterEvents(cityEvents, {
        date: filterDate,
        city: "all",
        category: filterCategory,
      })
    );
  }, [filterDate, filterCategory]);

  function handleDate(
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    setFilterDate(`${e.target.value}`);
  }

  function handleCategories(e: ChangeEvent<HTMLSelectElement>) {
    setFilterCategory(e.target.value);
  }

  const displayTitle: any = city;
  return (
    <>
      <Box>
        <FilterBar>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <CategoriesDropDown fn={handleCategories} />
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <DatesDropDown fn={handleDate} />
        </FilterBar>
        <Text borderBottom="2px" fontSize="3xl">
          {displayTitle}
        </Text>
      </Box>
      {(filteredEvents as any).length ? (
        <CardPage data={(filteredEvents as any)} />
      ) : (
        <Box textAlign="center">
          There are no{" "}
          {filterCategory !== "all" && filterCategory.toLowerCase()} events{" "}
          {city !== "all" && `for ${city}`} on these dates
        </Box>
      )}
    </>
  );
}

export async function getStaticProps(context: { params: { city: string } }) {
  const { params } = context;

  return {
    props: {
      city: params.city,
    },
  };
}

export function getStaticPaths() {
  // const dispatch = useDispatch();
  // const cities = useSelector((state: AppState) => state.cities);

  // Esto es provisional!!! La linea anterior me bota error
  const cities = [
    "Buenos Aires",
    "La Plata",
    "Guadalajara",
    "Bogota",
    "Cordoba",
    "Tijuana",
  ];
  // useEffect(() => {
  //   dispatch(getEvents());
  // }, []);
  const paths = cities.map((element: any) => ({
    params: { city: element.toLowerCase() },
  }));
  return {
    paths,
    fallback: true,
  };
}
