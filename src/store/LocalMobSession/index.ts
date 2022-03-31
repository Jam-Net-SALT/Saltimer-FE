import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnonymsUser } from "../../types/User";
import type { RootState } from "../index";

// Define a type for the slice state
interface LocalMobSessionState {
  backgroundImageUrl: string;
  startTime: number | undefined;
  pausedTime: number | undefined;
  driverTime: number;
  currentTurn: number;
  breakRound: 1 | 2 | 3 | 4;
  breakMinutes: number;
  members: AnonymsUser[];
}

// Define the initial state using that type
const initialState: LocalMobSessionState = {
  backgroundImageUrl: "https://cdn.wallpapersafari.com/69/67/pRkM8g.jpg",
  startTime: undefined,
  pausedTime: undefined,
  currentTurn: 1,
  breakMinutes: 10,
  driverTime: 10,
  breakRound: 2,
  members: [
    {
      name: "john doe",
      imageUrl:
        "https://spng.pngfind.com/pngs/s/5-52097_avatar-png-pic-vector-avatar-icon-png-transparent.png",
      turn: 1,
    },
  ],
};

export const localMobSessionSlice = createSlice({
  name: "localMobSession",
  initialState,
  reducers: {
    // Action to toggle between dark and light mode
    startMobTimer: (state) => {
      state.startTime = Date.now();
      state.pausedTime = undefined;
    },
    pauseMobTimer: (state) => {
      state.startTime = undefined;
      state.pausedTime = Date.now();
    },
    addNewMember: (state, action: PayloadAction<AnonymsUser>) => {
      state.members = [...state.members, action.payload];
    },
  },
});

export const { startMobTimer, pauseMobTimer, addNewMember } =
  localMobSessionSlice.actions;

export const selectLocalMobSession = (state: RootState) =>
  state.localMobSession;

export default localMobSessionSlice.reducer;
