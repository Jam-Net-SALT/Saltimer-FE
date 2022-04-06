import { AnonymsUser, User } from "../../types/User";

export interface MobMemberLocalProp {
  user: AnonymsUser | undefined;
}

export interface MobMemberRemoteProp {
  user: User | undefined;
}
