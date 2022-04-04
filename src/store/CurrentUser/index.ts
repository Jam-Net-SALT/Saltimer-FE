import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { User } from "../../types/User";
import { stat } from "fs";

// Define a type for the slice state
interface CurrentUserState {
  user?: User;
}

// Define the initial state using that type
const initialState: CurrentUserState = {
  user: undefined,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    // Action to toggle between dark and light mode
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    resetCurrentUser: (state) => {
      state.user = undefined;
    },
  },
});

export const { setCurrentUser, resetCurrentUser } = currentUserSlice.actions;

export const selectUser = (state: RootState) => state.currentUser.user;

export default currentUserSlice.reducer;
