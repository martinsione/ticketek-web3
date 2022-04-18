import type { AppState } from "../redux/store";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { getCategories, getCities, getEvents } from "../redux/actions";
import dateFilter from "../components/Functional Components/dateFilter";
import HomeFilterBar from "../components/FilterBar/HomeFilterBar";
import CardSlider from "../components/CardSlider/CardSlider";

function Home() {
  const dispatch = useDispatch();
  const { events } = useSelector((state: AppState) => state);

  useEffect(() => {
    if (!events.length) dispatch(getEvents());
    // if (!categories.length) dispatch(getCategories());
  }, []);
  useEffect(() => {
    dispatch(getCategories(events));
    dispatch(getCities(events));
  }, [events]);

  return (
    <div>
      <HomeFilterBar />
      <main>
        <CardSlider
          data={events}
          fn={(ev: any) => ev.name.includes("e")}
          title="Destacados"
        />
        <CardSlider
          data={events}
          fn={(ev: any) => dateFilter(events, "month") && ev}
          title="Este mes"
        />
        <CardSlider
          data={events}
          fn={(ev: any) => ev.place === "Cordoba"}
          title="En Cordoba"
        />
      </main>
    </div>
  );
}

export default Home;
