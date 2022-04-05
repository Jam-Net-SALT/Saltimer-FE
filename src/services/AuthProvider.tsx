import { AxiosError } from "axios";
import { createContext, ReactChild, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignInFormProps } from "../components/LoginForm/helpers";
import { SignUpFormProps } from "../components/SignupForm/helpers";
import {
  resetCurrentUser,
  selectUser,
  setCurrentUser,
} from "../store/CurrentUser";
import { setSignInError, setSignUpError } from "../store/Errors";
import { User } from "../types/User";
import { SaltimerApi } from "./SaltimerApi";

export interface AuthContextInterface {
  registerUser: (values: SignUpFormProps) => Promise<boolean>;
  logInUser: (values: SignInFormProps) => Promise<boolean>;
  logoutUser: () => boolean;
  updateUser:(values: User) => Promise<boolean>;
}

function AuthActions(): AuthContextInterface {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[token, setToken] = useState("");

  useEffect(() => {
    const reAuthenticate = async (localJwtToken: string) => {
      try {
        const userResponse = await getCurrentUser(localJwtToken);
        dispatch(setCurrentUser(userResponse));
        setToken(localJwtToken);
        navigate("/");
      } catch (e) {
        window.localStorage.removeItem("auth");
      }
    };

    const token = window.localStorage.getItem("auth");

    if (!user && token) reAuthenticate(token);
  }, []);

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
      const userResponse = await getCurrentUser(response.data.token);

      dispatch(setCurrentUser(userResponse));
      window.localStorage.removeItem("auth");
      window.localStorage.setItem("auth", response.data.token);
      setToken(response.data.token);
      return true;
    } catch (e: AxiosError | any) {
      dispatch(setSignInError("Wrong credentials"));
      return false;
    }
  };

  const updateUser = async (values: User): Promise<boolean> => {
    try {
      const response = await new SaltimerApi(token).updateUser(values);
      const userResponse = await getCurrentUser(token);

      dispatch(setCurrentUser(userResponse));
      return true;
    } catch (e: AxiosError | any) {
      dispatch(setSignInError("Wrong credentials"));
      return false;
    }
  };

  const getCurrentUser = async (JwtToken: string): Promise<User> => {
    const userResponse = await new SaltimerApi(JwtToken).getLoggedInUser();
    return userResponse.data;
  };

  const logoutUser = (): boolean => {
    if (user) {
      window.localStorage.removeItem(user?.username);
      dispatch(resetCurrentUser());
      setToken("");
      return true;
    }
    return false;
  };

  return { registerUser, logInUser, logoutUser, updateUser};
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: { children: ReactChild }) => {
  const auth = AuthActions();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
