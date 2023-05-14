import {Injectable} from "@angular/core";
import {AppState} from "../../../store";
import {select, Store} from "@ngrx/store";
import * as auth from "./auth.selectors";
import {login, logout, refreshToken, register} from "./auth.actions";
import {UserLoginModel, UserRegisterModel} from "../../model/user.model";

@Injectable({ providedIn: 'root' })
export class AuthStoreService {

  public readonly authToken$ = this.store.pipe(select(auth.authTokenState));
  public readonly authError$ = this.store.pipe(select(auth.authErrorState));
  public readonly authIsAuthenticated$ = this.store.pipe(select(auth.authIsAuthenticatedState));

  constructor(private store: Store<AppState>) {
  }

  public refreshAuthToken(token: string): void {
    this.store.dispatch(refreshToken({ token }));
  }

  public login(user: UserLoginModel): void {
    this.store.dispatch(login({ credentials: user}));
  }

  public register(user: UserRegisterModel): void {
    this.store.dispatch(register({ userData: user}));
  }

  public logout(): void {
    this.store.dispatch(logout());
  }
}
