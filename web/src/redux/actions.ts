// eslint-disable-next-line import/prefer-default-export
import axios from "axios";
export function getEvents() {
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
export function getCities() {
  return async function (
    dispatch: (arg0: { type: string; payload: {} }) => {}
  ) {
    const { data } = await axios("/api/cities");
    return dispatch({
      type: "GET_CITIES",
      payload: data,
    });
  };
}
