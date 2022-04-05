export function getEvents() {
  return async function (dispatch) {
    const data = await fetch("http://localhost:3000/api/events");
    const json = await data.json();
    console.log("actions");
    return dispatch({
      type: "GET_EVENTS",
      payload: json,
    });
  };
}
