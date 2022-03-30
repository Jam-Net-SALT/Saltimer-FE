import { Dispatch, SetStateAction } from "react";

export interface HeaderProps {
  toolbarState: boolean;
  setToolBarState: Dispatch<SetStateAction<boolean>>;
}
