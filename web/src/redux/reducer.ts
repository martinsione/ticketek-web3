const initialState = {
  events: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function rootReducer(state = initialState, payload: any) {
  switch (payload.type) {
    case "GET_EVENTS":
      return { ...state, events: payload };
    default:
      return state;
  }
}
