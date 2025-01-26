import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authSlice from "./authSlice";
import foodSlice from "./foodSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "food-app",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  food: foodSlice,
  cart: cartSlice,
  order: orderSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
