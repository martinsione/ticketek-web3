import axios from "axios";

import dateFilter from "../components/Functional Components/dateFilter";

export function getEvents() {
  // eslint-disable-next-line func-names
  return async function (
    dispatch: (arg0: { type: string; payload: {} }) => {}
  ) {
    const { data } = await axios("/api/events");
    return dispatch({
      type: "GET_EVENTS",
      payload: data,
    });
  };
}

export function getCategories(events: any) {
  // eslint-disable-next-line func-names
  return async function (
    dispatch: (arg0: { type: string; payload: {} }) => {}
  ) {
    // const { data } = await axios("/api/events");
    const categories = events.map(
      (ev: { metadata: { type: string } }) => ev.metadata.type
    );
    const uniqueCategories = categories.filter(
      (item: never, index: number, arr: []) => arr.indexOf(item) === index
    );
    return dispatch({
      type: "GET_CATEGORIES",
      payload: uniqueCategories,
    });
  };
}
// export function getCategories() {
//   // eslint-disable-next-line func-names
//   return async function (
//     dispatch: (arg0: { type: string; payload: {} }) => {}
//   ) {
//     const { data } = await axios("/api/events");
//     const categories = data.map(
//       (ev: { metadata: { type: string } }) => ev.metadata.type
//     );
//     const uniqueCategories = categories.filter(
//       (item: never, index: number, arr: []) => arr.indexOf(item) === index
//     );
//     return dispatch({
//       type: "GET_CATEGORIES",
//       payload: uniqueCategories,
//     });
//   };
// }
export function getCities(events: any) {
  // eslint-disable-next-line func-names
  return async function (
    dispatch: (arg0: { type: string; payload: {} }) => {}
  ) {
    const cities = events.map((ev: { place: string }) => ev.place);
    const uniqueCities = cities.filter(
      (item: never, index: number, arr: []) => arr.indexOf(item) === index
    );
    return dispatch({
      type: "GET_CITIES",
      payload: uniqueCities,
    });
  };
}
// export function getCities() {
//   // eslint-disable-next-line func-names
//   return async function (
//     dispatch: (arg0: { type: string; payload: {} }) => {}
//   ) {
//     const { data } = await axios("/api/events");
//     const cities = data.map((ev: { place: string }) => ev.place);
//     const uniqueCities = cities.filter(
//       (item: never, index: number, arr: []) => arr.indexOf(item) === index
//     );
//     return dispatch({
//       type: "GET_CITIES",
//       payload: uniqueCities,
//     });
//   };
// }

export function filterEvents(data: [], { date, city, category }: any) {
  // eslint-disable-next-line func-names
  return async function (
    dispatch: (arg0: { type: string; payload: {} }) => {}
  ) {
    const dataDate = date ? dateFilter(data, date) : data;
    const dataCategory =
      category && category !== "all"
        ? dataDate.filter((ev: any) => ev.metadata.type === category)
        : dataDate;
    const dataCity =
      city && city !== "all"
        ? dataCategory.filter((ev: any) => ev.place === city)
        : dataCategory;
    const dataFinal = dataCity;
    return dispatch({
      type: "FILTER_EVENTS",
      payload: dataFinal,
    });
  };
}

export function getUserFromDB(walletAddress: string) {
  // eslint-disable-next-line func-names
  return async function (
    dispatch: (arg0: { type: string; payload: {} }) => {}
  ) {
    const { data } = await axios(`/api/users/${walletAddress}`);
    return dispatch({
      type: "GET_USER",
      payload: data,
    });
  };
}

export function getEventsSessionStorage(payload: []) {
  return {
    type: "GET_EVENT_SESSION_STORAGE",
    payload,
  };
}
