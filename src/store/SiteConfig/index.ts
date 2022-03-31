import { ColorScheme } from "@mantine/core";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// Define a type for the slice state
interface SiteConfigState {
  themeScheme: ColorScheme;
}

// Define the initial state using that type
const initialState: SiteConfigState = {
  themeScheme: "light",
};

export const siteConfigSlice = createSlice({
  name: "siteConfig",
  initialState,
  reducers: {
    // Action to toggle between dark and light mode
    toggleColorScheme: (state) => {
      state.themeScheme = state.themeScheme === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleColorScheme } = siteConfigSlice.actions;

export const selectThemeScheme = (state: RootState) =>
  state.siteConfig.themeScheme;

export default siteConfigSlice.reducer;
