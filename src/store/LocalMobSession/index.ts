import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
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
    "https://papers.co/wallpaper/papers.co-mg01-cloud-flare-white-sky-wanna-fly-nature-35-3840x2160-4k-wallpaper.jpg",
  startTime: undefined,
  pausedTime: undefined,
  currentTurn: 0,
  breakMinutes: 10,
  driverTime: 1,
  breakRound: 2,
  members: [
    {
      id: "1",
      name: "Roberto Alkalis",
      imageUrl:
        "https://spng.pngfind.com/pngs/s/5-52097_avatar-png-pic-vector-avatar-icon-png-transparent.png",
      turn: 0,
    },
    {
      id: "2",
      name: "Lisa Larsson",
      imageUrl:
        "https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg",
      turn: 1,
    },
    {
      id: "3",
      name: "Johanna Olsson",
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
    setUpLocalMembers: (state, action: PayloadAction<AnonymsUser[]>) => {
      state.members = [...action.payload];
    },

    startMobTimer: (state) => {
      state.pausedTime = state.startTime;
      state.startTime = Date.now();
    },
    pauseMobTimer: (state) => {
      state.pausedTime = Date.now();
    },
    addNewMember: (state, action: PayloadAction<AnonymsUser>) => {
      state.members = [...state.members, action.payload];
    },
    removeMember: (state, action: PayloadAction<AnonymsUser>) => {
      state.members = state.members.filter((u) => u.id !== action.payload.id);
    },
    editMember: (state, action: PayloadAction<AnonymsUser>) => {
      const cleanState = state.members.filter(
        (u) => u.id !== action.payload.id
      );
      state.members = [...cleanState, action.payload];
    },
    stepToNextDriver: (state) => {
      if (state.currentTurn + 1 >= state.members.length) state.currentTurn = 0;
      else state.currentTurn = state.currentTurn + 1;
    },
  },
});

export const {
  setUpLocalMembers,
  startMobTimer,
  pauseMobTimer,
  addNewMember,
  removeMember,
  editMember,
  stepToNextDriver,
} = localMobSessionSlice.actions;

export const selectLocalMobSession = (state: RootState) =>
  state.localMobSession;

export default localMobSessionSlice.reducer;
