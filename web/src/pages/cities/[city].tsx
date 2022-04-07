import { useSelector } from "react-redux";
import React from "react";
import { Select } from "@chakra-ui/react";

import CategoriesDropDown from "../../components/FilterBar/CategoriesDropDown";
import EventCardViewer from "../../components/EventCardsViewer/EventCardsViewer";

export default function City({ city }: { city: string }) {
  const data: [] = useSelector((state) => state.events);
  console.log("🚀 ~ file: [city].tsx ~ line 7 ~ City ~ data", data);
  const cityData = data.filter((ev: { city: string }) => ev.city === city);

  function handleCategories(e) {
    e.preventDefault();
  }

  return (
    <div>
      {cityData && (
        <>
          <Select
            bg="gray.105"
            borderRadius="30"
            defaultValue="All events..."
            name="category"
            p="10px"
            w="25%"
            onChange={handleCategories}
          >
            <option disabled style={{ color: "gray" }}>
              All events...
            </option>
            <CategoriesDropDown />
          </Select>
          <EventCardViewer json={cityData} range={[0, 5]} title={city} />
        </>
      )}
    </div>
  );
}

export async function getStaticProps(context: { params: { city: string } }) {
  const { params } = context;
  const data = await fetch(`http://localhost:3000/api/cities/${params.city}`);
  const json = await data.json();

  if (!json.length) return { notFound: true };

  return {
    props: {
      data: json,
      city: params.city,
    },
  };
}

export async function getStaticPaths() {
  interface EVENT {
    city: string;
  }
  const data = await fetch("http://localhost:3000/api/cities");
  const json = await data.json();

  const paths = json.map((event: EVENT) => ({
    params: {
      city: `${event.city}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
