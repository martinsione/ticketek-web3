// eslint-disable-next-line import/prefer-default-export
export function getEvents() {
  return async function (
    dispatch: (arg0: { type: string; payload: {} }) => {}
  ) {
    const data = await fetch("/api/events");
    const json = await data.json();
    return dispatch({
      type: "GET_EVENTS",
      payload: json,
    });
  };
}
