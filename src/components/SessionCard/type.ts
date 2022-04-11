import { MobSession } from "../../types/MobSession";

export interface SessionCardProps {
  session: MobSession;
  onRemove: (sessionId: number, userId: number) => Promise<void>;
}
