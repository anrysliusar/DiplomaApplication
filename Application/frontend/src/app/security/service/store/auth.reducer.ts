import {createReducer, on} from '@ngrx/store';
import {loginSuccess, loginFailure, registerSuccess, registerFailure, refreshToken, logout} from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  token: string;
  error: string;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  token: '',
  error: ''
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, registerSuccess, (state, {token}) => ({
      ...state,
      isAuthenticated: true,
      token,
      error: ''
  })),
  on(loginFailure, registerFailure, (state, {error}) => ({
    ...state,
    isAuthenticated: false,
    token: '',
    error
  })),
  on(refreshToken, (state, {token}) => ({
      ...state,
      token
    }
  )),
  on(logout, () => ({
      ...initialState
    }
  ))
);

