const initialState = {
  events: [],
  cities: [],
  categories: [],
  contracts: [],
  filterEvents: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_EVENTS":
      return { ...state, events: action.payload };
    case "GET_CITIES":
      return { ...state, cities: action.payload };
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "GET_CONTRACTS":
      return { ...state, contracts: action.payload };
    case "FILTER_EVENTS":
      return { ...state, filterEvents: action.payload };

    default:
      return state;
  }
}
