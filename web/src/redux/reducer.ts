const initialState = {
  events: [],
};

function rootReducer(
  state = initialState,
  { type, payload }: { type: String; payload: {} }
) {
  switch (type) {
    case "GET_EVENTS":
      return { ...state, events: payload };
    default:
      return state;
  }
}

export default rootReducer;
