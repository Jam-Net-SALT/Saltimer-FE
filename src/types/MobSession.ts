export interface MobSession {
  id: number;
  uniqueId: string;
  displayName: string;
  roundTime: number;
  startTime: Date;
  breakTime: number;
  pausedTime: Date;
}
