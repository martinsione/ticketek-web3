import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { AppState, store } from "../redux/store";
import { /* getCategories, getCities, */ getEvents } from "../redux/actions";
import dateFilter from "../components/Functional Components/dateFilter";
import HomeFilterBar from "../components/FilterBar/HomeFilterBar";
import CardSlider from "../components/CardSlider/CardSlider";

export const localStorage = (stateName: string) => {
  const sessionState = sessionStorage.getItem(stateName);
  return sessionState && JSON.parse(sessionState);
};

function Home() {
  const dispatch = useDispatch();
  const [homeStorage, setHomeStorage] = useState([]);
  const { events } = useSelector((state: AppState) => state);

  // useEffect(() => {
  //   if (!events.length) dispatch(getEvents());
  //   // if (!categories.length) dispatch(getCategories());
  // }, []);
  // useEffect(() => {
  //   dispatch(getCategories(events));
  //   dispatch(getCities(events));
  // }, [events]);
  useEffect(() => {
    const sessionState = localStorage("homeState");
    if (sessionState?.length) {
      setHomeStorage(sessionState);
      return;
    }
    dispatch(getEvents());
  }, []);

  store.subscribe(() => setHomeStorage(events));

  useEffect(() => {
    sessionStorage.setItem("homeState", JSON.stringify(homeStorage));
  }, [homeStorage]);

  return (
    <div>
      <HomeFilterBar />
      <main>
        <CardSlider
          data={homeStorage.length ? homeStorage : events}
          fn={(ev: any) => ev.name.includes("e")}
          title="Destacados"
        />
        <CardSlider
          data={homeStorage.length ? homeStorage : events}
          fn={(ev: any) => dateFilter(events, "month") && ev}
          title="Este mes"
        />
        <CardSlider
          data={homeStorage.length ? homeStorage : events}
          fn={(ev: any) => ev.place === "Cordoba"}
          title="En Cordoba"
        />
      </main>
    </div>
  );
}

export default Home;
