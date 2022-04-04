import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { User } from "../../types/User";

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
    setCurrentUser: (state, action: PayloadAction<User>) => {},
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export const selectUser = (state: RootState) => state.currentUser.user;

export default currentUserSlice.reducer;
