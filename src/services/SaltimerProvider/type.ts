import { User } from "../../types/User";

export interface SessionInfoResponse {
  breakTime: number;
  displayName: string;
  id: number;
  roundTime: number;
  uniqueId: string;
  users: User[];
}

export interface SessionTimerResponse {
  breakRound: number;
  currentDriver: string;
  pausedTime: Date;
  startTime: Date;
  totalRoundCount: number;
}

export interface ServerInfoResponse {
  title: string;
  message: string;
}
