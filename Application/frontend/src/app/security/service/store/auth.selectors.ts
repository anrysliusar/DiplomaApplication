import {createSelector} from "@ngrx/store";
import {AppState} from "../../../store";

export const selectAuthConfig = (state: AppState) => state.authConfig;
export const authTokenState = createSelector(selectAuthConfig, (state) => state.token);
export const authErrorState = createSelector(selectAuthConfig, (state) => state.error);
export const authIsAuthenticatedState = createSelector(selectAuthConfig, (state) => state.isAuthenticated);
