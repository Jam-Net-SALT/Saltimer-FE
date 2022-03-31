import { configureStore } from "@reduxjs/toolkit";
import { siteConfigSlice } from "./SiteConfig";

const store = configureStore({
  reducer: {
    siteConfig: siteConfigSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
