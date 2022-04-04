import { AxiosError } from "axios";
import { createContext, ReactChild } from "react";
import { useDispatch } from "react-redux";
import { SignUpFormProps } from "../components/SignupForm/helpers";
import { setCurrentUser } from "../store/CurrentUser";
import { setSignUpError } from "../store/Errors";
import { SaltimerApi } from "./SaltimerApi";

export interface AuthContextInterface {
  registerUser: (values: SignUpFormProps) => Promise<boolean>;
}

function AuthActions(): AuthContextInterface {
  const dispatch = useDispatch();

  const registerUser = async (values: SignUpFormProps): Promise<boolean> => {
    try {
      const response = await new SaltimerApi("").registerUser(values);
      dispatch(setCurrentUser(response.data));
      return true;
    } catch (e: AxiosError | any) {
      dispatch(setSignUpError(e.response?.data.message));
      return false;
    }
  };

  return { registerUser };
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: { children: ReactChild }) => {
  const auth = AuthActions();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
