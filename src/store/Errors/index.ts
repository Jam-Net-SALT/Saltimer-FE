import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { User } from "../../types/User";

// Define a type for the slice state
interface ErrorsState {
  signUpError: string;
  signInError: string;
}

// Define the initial state using that type
const initialState: ErrorsState = {
  signUpError: "",
  signInError: "",
};

export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    // Action to toggle between dark and light mode
    setSignUpError: (state, action: PayloadAction<string>) => {
      state.signUpError = action.payload;
    },
    resetSignUpError: (state) => {
      state.signUpError = "";
    },

    setSignInError: (state, action: PayloadAction<string>) => {
      state.signInError = action.payload;
    },
    resetSignInError: (state) => {
      state.signInError = "";
    },
  },
});

export const {
  setSignUpError,
  resetSignUpError,
  setSignInError,
  resetSignInError,
} = errorsSlice.actions;

export const selectSignupError = (state: RootState) => state.errors.signUpError;
export const selectSignInError = (state: RootState) => state.errors.signInError;

export default errorsSlice.reducer;
