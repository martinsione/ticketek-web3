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

const estilos = {
  fontSize: "50px",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function Home() {
  const dispatch = useDispatch();
  const [homeStorage, setHomeStorage] = useState([]);
  const { events } = useSelector((state: AppState) => state);
  const [error, setError] = useState(false);
  const [loadingDestacados, setLoadingDestacados] = useState(false);

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
    if (!events.length) {
      try {
        setError(false);
        setLoadingDestacados(true);
        dispatch(getEvents());
      } catch {
        setError(true);
      }
    }
  }, [events]);

  store.subscribe(() => {
    setHomeStorage(events);
    setLoadingDestacados(false);
    console.log(store.getState());
  });

  useEffect(() => {
    sessionStorage.setItem("homeState", JSON.stringify(homeStorage));
  }, [homeStorage]);

  if (error) return <div style={estilos}>Algo salio mal...</div>;
  return (
    <div>
      <HomeFilterBar />
      <main>
        <CardSlider
          data={homeStorage.length ? homeStorage : events}
          fn={(ev: any) => ev.name.includes("e")}
          loading={loadingDestacados}
          title="Destacados"
        />
        <CardSlider
          data={homeStorage.length ? homeStorage : events}
          fn={(ev: any) => dateFilter(events, "month") && ev}
          loading={loadingDestacados}
          title="Este mes"
        />
        <CardSlider
          data={homeStorage.length ? homeStorage : events}
          fn={(ev: any) => ev.place === "Cordoba"}
          loading={loadingDestacados}
          title="En Cordoba"
        />
      </main>
    </div>
  );
}

export default Home;
