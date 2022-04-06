import { User } from "./User";

export interface MobSession {
  id: number;
  uniqueId: string;
  displayName: string;
  roundTime: number;
  startTime: Date;
  breakTime: number;
  pausedTime: Date;
}

export interface VipMobSession {
  id: number;
  turn: number;
  user: User;
  session: MobSession;
}
