import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnonymsUser } from "../../types/User";
import type { RootState } from "../index";

// Define a type for the slice state
interface LocalMobSessionState {
  backgroundImageUrl: string;
  backgroundImageUrlDark: string;
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
  backgroundImageUrlDark: "https://cdn.wallpapersafari.com/69/67/pRkM8g.jpg",
  backgroundImageUrl:
    "https://images.unsplash.com/photo-1497412159286-98933a0e327f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmxhY2slMjBhbmQlMjB3aGl0ZSUyMGZvZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  startTime: undefined,
  pausedTime: undefined,
  currentTurn: 0,
  breakMinutes: 10,
  driverTime: 1,
  breakRound: 2,
  members: [
    {
      name: "John doe",
      imageUrl:
        "https://spng.pngfind.com/pngs/s/5-52097_avatar-png-pic-vector-avatar-icon-png-transparent.png",
      turn: 0,
    },
    {
      name: "Jane Doe",
      imageUrl:
        "https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg",
      turn: 1,
    },
    {
      name: "Emma James",
      imageUrl:
        "https://w7.pngwing.com/pngs/749/780/png-transparent-female-avatar-cartoon-user-avatar-purple-face-heroes.png",
      turn: 2,
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
    stepToNextDriver: (state) => {
      if (state.currentTurn + 1 >= state.members.length) state.currentTurn = 0;
      else state.currentTurn = state.currentTurn + 1;
    },
  },
});

export const { startMobTimer, pauseMobTimer, addNewMember, stepToNextDriver } =
  localMobSessionSlice.actions;

export const selectLocalMobSession = (state: RootState) =>
  state.localMobSession;

export default localMobSessionSlice.reducer;
