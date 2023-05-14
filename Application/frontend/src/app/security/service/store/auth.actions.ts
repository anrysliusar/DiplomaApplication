import { createAction, props } from '@ngrx/store';
import {UserLoginModel, UserRegisterModel} from "../../model/user.model";

export const login = createAction('[Auth] Login', props<{ credentials: UserLoginModel }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const register = createAction('[Auth] Register', props<{ userData: UserRegisterModel }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ token: string }>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());

export const refreshToken = createAction('[Auth] Refresh Token', props<{ token: string }>());
export const logout = createAction('[Auth] Logout');


