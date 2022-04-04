import { AxiosError } from "axios";
import { createContext, ReactChild } from "react";
import { useDispatch } from "react-redux";
import { SignInFormProps } from "../components/LoginForm/helpers";
import { SignUpFormProps } from "../components/SignupForm/helpers";
import { setCurrentUser } from "../store/CurrentUser";
import { setSignInError, setSignUpError } from "../store/Errors";
import { SaltimerApi } from "./SaltimerApi";

export interface AuthContextInterface {
  registerUser: (values: SignUpFormProps) => Promise<boolean>;
  logInUser: (values: SignInFormProps) => Promise<boolean>;
}

function AuthActions(): AuthContextInterface {
  const dispatch = useDispatch();

  const registerUser = async (values: SignUpFormProps): Promise<boolean> => {
    try {
      await new SaltimerApi("").registerUser(values);
      await logInUser({
        username: values.username,
        password: values.password,
      });
      return true;
    } catch (e: AxiosError | any) {
      dispatch(setSignUpError(e.response?.data.message));
      return false;
    }
  };

  const logInUser = async (values: SignInFormProps): Promise<boolean> => {
    try {
      const response = await new SaltimerApi("").logInUser(values);
      const userResponse = await new SaltimerApi(
        response.data.token
      ).getLoggedInUser();
      dispatch(setCurrentUser(userResponse.data));
      window.localStorage.setItem(
        userResponse.data.username,
        response.data.token
      );
      return true;
    } catch (e: AxiosError | any) {
      dispatch(setSignInError("Wrong credentials"));
      return false;
    }
  };

  return { registerUser, logInUser };
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: { children: ReactChild }) => {
  const auth = AuthActions();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
