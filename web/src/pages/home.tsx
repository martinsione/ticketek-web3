import type { AppState } from "../redux/store";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { getEvents } from "../redux/actions";
import FilterBar from "../components/FilterBar/FilterBar";
import EventCardViewer from "../components/EventCardsViewer/EventCardsViewer";
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

  return (
    <div>
      <FilterBar />
      <main>
        <CardSlider />
        <EventCardViewer json={data} range={[0, 3]} title="Destacados" />
        <EventCardViewer json={data} range={[4, 7]} title="En tu ciudad" />
        <EventCardViewer
          json={data}
          range={[8, 11]}
          title="Este fin de semana"
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
