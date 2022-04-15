import type { AppState } from "../redux/store";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { getCategories, getContracts, getEvents } from "../redux/actions";
import HomeFilterBar from "../components/FilterBar/HomeFilterBar";
import CardSlider from "../components/CardSlider/CardSlider";

// interface JSON {
//   json: [];
// }

function Home() {
  //  { json }: JSON
  const dispatch = useDispatch();
  const data = useSelector((state: AppState) => state.contracts);

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getCategories());
    dispatch(getContracts());
  }, []);

  return (
    <div>
      <HomeFilterBar />
      <main>
        <CardSlider
          data={data}
          fn={() => Math.random() > 0.2}
          // fn={(ev: any) => ev.name === "Carcass"}
          title="Destacados"
        />
        <CardSlider
          data={data}
          fn={(ev) => ev.city === "Bogotá" || ev.city === "Medellín"}
          title="En Colombia"
        />
        <CardSlider
          data={data}
          fn={(ev) => ev.city === "Mendoza"}
          title="En Mendoza"
        />
      </main>
    </div>
  );
}

export default Home;

// export async function getStaticProps() {
//   const data = await fetch("http://localhost:3000/api/events");
//   const json = await data.json();
//   return {
//     props: {
//       json,
//     },
//   };
// }
