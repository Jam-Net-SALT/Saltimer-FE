import { SignInFormProps } from "../components/LoginForm/helpers";
import { SignUpFormProps } from "../components/SignupForm/helpers";
import { TokenResponse } from "../types/TokenResponse";
import { User } from "../types/User";
import { HttpClientBase } from "../utils/HttpClientBase";

export class SaltimerApi extends HttpClientBase {
  public constructor(jwtToken: string) {
    super(process.env.REACT_APP_SALTIMER_API, jwtToken);
  }
  public registerUser = (signUpFormValues: SignUpFormProps) =>
    this.instance.post<User>(`/auth/register`, signUpFormValues);

  public logInUser = (signInFormValues: SignInFormProps) =>
    this.instance.post<TokenResponse>(`/auth/login`, signInFormValues);

  public getLoggedInUser = () => this.instance.get<User>(`/auth/user`);
}
