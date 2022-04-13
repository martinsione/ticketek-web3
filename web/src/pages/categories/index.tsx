import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { AppState } from "../../redux/store";
import { getEvents } from "../../redux/actions";
import eventData from "../../components/eventData";
import CardPage from "../../components/CardPage/CardPage";

// type Props = {};

export default function index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
  }, []);
  const { query } = useRouter(); //  query.cat

  const events = useSelector((state: AppState) => state.events);
  const eventsFiltered = events.filter((ev: any) => {
    const { metadata }: any = eventData(ev.address);
    return metadata.type === query.cat;
  });

  const displayTitle: string = query.cat;

  return (
    <>
      {/* <div>hola</div> */}
      {eventsFiltered && (
        <CardPage data={eventsFiltered} title={displayTitle} />
      )}
    </>
  );
}
