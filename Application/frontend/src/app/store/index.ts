import {ActionReducerMap} from "@ngrx/store";
import {authReducer, AuthState} from "../security/service/store/auth.reducer";
import {AuthEffects} from "../security/service/store/auth.effects";
import {projectTreeReducer, TreeState} from "../projects/service/store/project.reducer";

export class AppState {
  authConfig: AuthState;
  treeConfig: TreeState;
}

export const reducers: ActionReducerMap<AppState> = {
  authConfig: authReducer,
  treeConfig: projectTreeReducer
}

export const effects = [
  AuthEffects
];
