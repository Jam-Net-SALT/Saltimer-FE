import { AxiosError, AxiosResponse } from "axios";
import { createContext, ReactChild, useState } from "react";
import { useDispatch } from "react-redux";
import { SignUpFormProps } from "../components/SignupForm/helpers";
import { setSignUpError } from "../store/Errors";
import { User } from "../types/User";
import { SaltimerApi } from "./SaltimerApi";

export interface AuthContextInterface {
  user?: User;
  registerUser: (values: SignUpFormProps) => Promise<boolean>;
}

function AuthActions(): AuthContextInterface {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>();

  console.log("User: ", user);

  const registerUser = async (values: SignUpFormProps): Promise<boolean> => {
    try {
      const response = await new SaltimerApi("").registerUser(values);
      setUser(response.data);
      return true;
    } catch (e: AxiosError | any) {
      dispatch(setSignUpError(e.response?.data.message));
      return false;
    }
  };

  return { user, registerUser };
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: { children: ReactChild }) => {
  const auth = AuthActions();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
