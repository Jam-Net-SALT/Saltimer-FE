import { AnonymsUser } from "../../types/User";

export interface EditLocalMemberProps {
  isOpen: boolean;
  onClose: () => void;
  user: AnonymsUser;
}

export interface EditLocalMemberFormProps {
  name: string;
  imageUrl: string;
}
