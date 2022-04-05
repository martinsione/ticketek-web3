const initialState = {
  events: [],
};

function rootReducer(
  { type, payload }: { type: String; payload: {} },
  state = initialState
) {
  switch (type) {
    case "GET_EVENTS":
      return { ...state, events: payload };
    default:
      return state;
  }
}

export default rootReducer;
