const initialState = {
  events: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_EVENTS":
      return { ...state, events: action.payload };
    default:
      return state;
  }
}
