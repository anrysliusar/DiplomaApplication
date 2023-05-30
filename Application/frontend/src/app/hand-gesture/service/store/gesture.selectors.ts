import {createSelector} from "@ngrx/store";
import {AppState} from "../../../store";

export const selectGestureConfig = (state: AppState) => state.gestureConfig;
export const selectCurrentGesture = createSelector(selectGestureConfig, (state) => state.gesture);
export const selectCurrentLandmarks = createSelector(selectGestureConfig, (state) => state.landmarks);
