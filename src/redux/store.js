import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./cardsSlice";

export const store = configureStore({
  reducer: {
    cards: cardsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
