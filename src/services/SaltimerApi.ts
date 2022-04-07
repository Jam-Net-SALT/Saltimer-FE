import { SignInFormProps } from "../components/LoginForm/helpers";
import { SignUpFormProps } from "../components/SignupForm/helpers";
import { MobSession, VipMobSession } from "../types/MobSession";
import { TokenResponse } from "../types/TokenResponse";
import { User } from "../types/User";
import { HttpClientBase } from "../utils/HttpClientBase";

export class SaltimerApi extends HttpClientBase {
  public constructor(jwtToken: string) {
    super("https://saltimer-api.herokuapp.com/api", jwtToken);
  }
  public registerUser = (signUpFormValues: SignUpFormProps) =>
    this.instance.post<User>(`/auth/register`, signUpFormValues);

  public updateUser = (user: User) =>
    this.instance.put<User>(`/auth/user`, user);

  public logInUser = (signInFormValues: SignInFormProps) =>
    this.instance.post<TokenResponse>(`/auth/login`, signInFormValues);

  public getLoggedInUser = () => this.instance.get<User>(`/auth/user`);

  public postMobTimer = (mobSession: MobSession) =>
  this.instance.post<MobSession>(`/mobtimer`, mobSession);

  public getMobTimerSessions = () =>
    this.instance.get<MobSession[]>(`/mobtimer`);

  public joinMobTimerSession = (sessionToken: string) =>
    this.instance.post<VipMobSession>(`/sessionMember/vip`, {
      uuid: sessionToken,
    });
}
