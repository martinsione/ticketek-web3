import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { AppState } from "../../redux/store";
import { filterEvents, getContracts } from "../../redux/actions";
import prisma from "../../lib/prisma";
import FilterBar from "../../components/FilterBar/FilterBar";
import DatesDropDown from "../../components/FilterBar/DatesDropDown";
import CategoriesDropDown from "../../components/FilterBar/CategoriesDropDown";
import CardPage from "../../components/CardPage/CardPage";

export default function City({ city }: { city: string }) {
  const dispatch = useDispatch();

  const [filterDate, setFilterDate] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredEvents = useSelector((state: AppState) => state.filterEvents);

  useEffect(() => {
    dispatch(getContracts());
  }, []);
  const allEvents = useSelector((state: AppState) => state.contracts).filter(
    (ev: any) => ev.city === city
  );

  useEffect(() => {
    dispatch(
      filterEvents(allEvents, {
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
      <FilterBar>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <CategoriesDropDown fn={handleCategories} />
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <DatesDropDown fn={handleDate} />
      </FilterBar>
      {filteredEvents.length ? (
        <CardPage data={filteredEvents} title={displayTitle} />
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
  const cities = await prisma.contract.findMany();
  const data = cities.filter((e: { city: string }) => e.city === params.city);

  return {
    props: {
      data,
      city: params.city,
    },
  };
}

export async function getStaticPaths() {
  const cities = await prisma.contract.findMany();
  const paths = cities.map((element) => ({
    params: { city: element.city.toLowerCase() },
  }));
  return {
    paths,
    fallback: true,
  };
}
