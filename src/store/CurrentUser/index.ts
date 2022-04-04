import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { User } from "../../types/User";
import { SignUpFormProps } from "../../components/SignupForm";
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
    registerHandler: (state, action: PayloadAction<SignUpFormProps>) => {
      console.log("Values: ", action.payload);
    },
  },
});

export const { registerHandler } = currentUserSlice.actions;

export const selectUser = (state: RootState) => state.currentUser.user;

export default currentUserSlice.reducer;
