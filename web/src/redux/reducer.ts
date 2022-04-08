const initialState = {
  events: [],
  cities: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_EVENTS":
      return { ...state, events: action.payload };
    case "GET_CITIES":
      return { ...state, cities: action.payload };
    default:
      return state;
  }
}
