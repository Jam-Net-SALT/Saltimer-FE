import { ColorScheme } from "@mantine/core";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// Define a type for the slice state
interface SiteConfigState {
  themeScheme: ColorScheme;
  showSideBar: boolean;
}

// Define the initial state using that type
const initialState: SiteConfigState = {
  themeScheme: "light",
  showSideBar: false,
};

export const siteConfigSlice = createSlice({
  name: "siteConfig",
  initialState,
  reducers: {
    // Action to toggle between dark and light mode
    toggleColorScheme: (state) => {
      state.themeScheme = state.themeScheme === "dark" ? "light" : "dark";
    },
    toggleSideBar: (state) => {
      state.showSideBar = !state.showSideBar;
    },
  },
});

export const { toggleColorScheme, toggleSideBar } = siteConfigSlice.actions;

export const selectThemeScheme = (state: RootState) =>
  state.siteConfig.themeScheme;

export const selectShowSideBar = (state: RootState) =>
  state.siteConfig.showSideBar;

export default siteConfigSlice.reducer;
