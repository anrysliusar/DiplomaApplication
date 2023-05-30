import { createAction, props } from '@ngrx/store';
import {Gesture} from "../../component/gesture.model";
import {NormalizedLandmark} from "@mediapipe/drawing_utils";

export const updateRecognizedGesture = createAction('[Gesture] Update recognized gesture', props<{ gesture: Gesture }>());
export const updateCurrentLandMark = createAction('[Gesture] Update current landmark', props<{ landmarks: NormalizedLandmark[][] }>());
