import type { AppState } from "../redux/store";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { getEvents } from "../redux/actions";
import FilterBar from "../components/FilterBar/FilterBar";
import CardSlider from "../components/CardSlider/CardSlider";

// interface JSON {
//   json: [];
// }

function Home() {
  //  { json }: JSON
  const dispatch = useDispatch();
  const data = useSelector((state: AppState) => state.events);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  let count = 0;
  const intervalID = setInterval(myCallback, 500, "Parameter 1", "Parameter 2");
  const go = () => {
    intervalID;
  };
  function myCallback(a, b) {
    if (count > 8) {
      clearInterval(intervalID);
      count = 0;
    }
    count++;
    console.log(count);
  }

  return (
    <div>
      <div>
        <button type="button" onClick={go}>
          GO
        </button>
      </div>
      <FilterBar />
      <main>
        <CardSlider
          data={data}
          fn={() => Math.random() > 0.2}
          // fn={(ev: any) => ev.name === "Carcass"}
          title="Destacados"
        />
        <CardSlider
          data={data}
          fn={(ev: any) => ev.city === "Bogotá" || ev.city === "Medellín"}
          title="En Colombia"
        />
        <CardSlider
          data={data}
          fn={(ev: any) => ev.city === "Mendoza"}
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
