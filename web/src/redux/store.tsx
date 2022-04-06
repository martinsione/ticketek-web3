import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "./reducer";

// eslint-disable-next-line import/prefer-default-export
export const store: any = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type AppState = ReturnType<typeof rootReducer>;
