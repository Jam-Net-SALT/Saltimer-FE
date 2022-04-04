import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { localMobSessionSlice } from "./LocalMobSession";
import { siteConfigSlice } from "./SiteConfig";
import { currentUserSlice } from "./CurrentUser";
import { errorsSlice } from "./Errors";

const store = configureStore({
  reducer: {
    siteConfig: siteConfigSlice.reducer,
    localMobSession: localMobSessionSlice.reducer,
    currentUser: currentUserSlice.reducer,
    errors: errorsSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
