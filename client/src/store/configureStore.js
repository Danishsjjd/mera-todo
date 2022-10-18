import { configureStore, combineReducers } from "@reduxjs/toolkit";

import api from "./middleware/api";
import { apiCallBegan } from "./middleware/api";
import todo from "./todo";

const reducer = combineReducers({
  todo,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: { ignoreActions: [apiCallBegan.type] },
    }),
    api,
  ],
});

export default store;
