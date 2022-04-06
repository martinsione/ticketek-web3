// eslint-disable-next-line import/prefer-default-export
export function getEvents() {
  return async function (
    dispatch: (arg0: { type: string; payload: {} }) => {}
  ) {
    const data = await fetch("http://localhost:3000/api/events");
    const json = await data.json();
    return dispatch({
      type: "GET_EVENTS",
      payload: json,
    });
  };
}
