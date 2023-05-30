import {createReducer, on} from '@ngrx/store';
import {Gesture} from "../../component/gesture.model";
import {updateCurrentLandMark, updateRecognizedGesture} from "./gesture.actions";
import {NormalizedLandmark} from "@mediapipe/drawing_utils";

export interface GestureState {
  gesture: Gesture;
  landmarks: NormalizedLandmark[][];
}

export const initialState: GestureState = {
  gesture: Gesture.None,
  landmarks: []
};

export const gestureReducer = createReducer(
  initialState,
  on(updateRecognizedGesture, (state, {gesture}) => ({...state, gesture: gesture})),
  on(updateCurrentLandMark, (state, {landmarks}) => ({...state, landmarks: landmarks})),
);

