import { configureStore } from "@reduxjs/toolkit";
import { prmtsApi } from "./api/prmtsApi.ts";

export const store = configureStore({
    reducer: {
        [prmtsApi.reducerPath]: prmtsApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(prmtsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;