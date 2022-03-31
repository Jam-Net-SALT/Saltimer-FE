import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// Define a type for the slice state
interface SiteConfigState {
  themeSchema: "light" | "dark";
}

// Define the initial state using that type
const initialState: SiteConfigState = {
  themeSchema: "light",
};

export const siteConfigSlice = createSlice({
  name: "siteConfig",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDarkMode: (state) => {
      state.themeSchema = "dark";
    },
    setLightMode: (state) => {
      state.themeSchema = "light";
    },
  },
});

export const { setDarkMode, setLightMode } = siteConfigSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectThemeSchema = (state: RootState) =>
  state.siteConfig.themeSchema;

export default siteConfigSlice.reducer;
