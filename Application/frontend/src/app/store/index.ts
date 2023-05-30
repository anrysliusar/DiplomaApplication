import {ActionReducerMap} from "@ngrx/store";
import {authReducer, AuthState} from "../security/service/store/auth.reducer";
import {AuthEffects} from "../security/service/store/auth.effects";
import {projectTreeReducer, TreeState} from "../projects/service/store/project.reducer";
import {gestureReducer, GestureState} from "../hand-gesture/service/store/gesture.reducer";

export class AppState {
  authConfig: AuthState;
  treeConfig: TreeState;
  gestureConfig: GestureState
}

export const reducers: ActionReducerMap<AppState> = {
  authConfig: authReducer,
  treeConfig: projectTreeReducer,
  gestureConfig: gestureReducer
}

export const effects = [
  AuthEffects
];
