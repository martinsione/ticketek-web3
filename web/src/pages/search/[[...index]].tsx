/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// @ts-nocheck
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AppState, store } from "../../redux/store";
import { getEvents } from "../../redux/actions";
import CardPage from "../../components/CardPage/CardPage";

interface EVENT {
  name: string;
  place: string;
  id: string;
  metadata: {
    image: string;
    date: string;
  };
}

const estilos = {
  fontSize: "50px",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const localStorage = (stateName: string) => {
  const sessionState = sessionStorage.getItem(stateName);
  return sessionState && JSON.parse(sessionState);
};

export default function Search() {
  const router = useRouter();
  const { searchTerm } = router.query;
  const [homeStorage, setHomeStorage] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { events } = useSelector((state: AppState) => state);

  useEffect(() => {
    const sessionState = localStorage("homeState");
    if (sessionState?.length) {
      setHomeStorage(sessionState);
      return;
    }
    if (!events.length) {
      try {
        setError(false);
        setLoading(true);
        dispatch(getEvents());
      } catch {
        setError(true);
      }
    }
  }, [events]);

  store.subscribe(() => {
    setHomeStorage(store.getState().events);
    setLoading(false);
  });

  useEffect(() => {
    sessionStorage.setItem("homeState", JSON.stringify(homeStorage));
  }, [homeStorage]);

  const matches: EVENT[] = [];
  const articles: string[] = [
    "de",
    "del",
    "el",
    "la",
    "lo",
    "los",
    "the",
    "of",
    "la",
    "las",
  ];
  const querySplit = searchTerm ? (searchTerm as string).split(" ") : null;
  if (querySplit === null)
    return <div style={estilos}>Nothing to search for...</div>;

  // eslint-disable-next-line array-callback-return
  homeStorage.map((event: EVENT) => {
    // a = key of the object data
    // let a: keyof EVENT
    for (let a in event) {
      const key = a as keyof EVENT;
      const value = event[key];
      const aSplit =
        typeof value === "string"
          ? value.split(" ").map((element: string) => element.toLowerCase())
          : value;

      for (const b of querySplit) {
        if (a === "name" || a === "place") {
          // @ts-ignore
          for (a of aSplit) {
            if (a.includes(b.toLowerCase()) && !articles.includes(b)) {
              matches.push(event);
            }
          }
        }
      }
    }
  });

  const arrUniq = [...new Map(matches.map((v: EVENT) => [v.id, v])).values()];

  if (error) return <div style={estilos}>Something went wrong...</div>;
  if (loading) return <div style={estilos}> Cargando...</div>;
  return <div>{arrUniq.length && <CardPage data={arrUniq as any} />}</div>;
}
