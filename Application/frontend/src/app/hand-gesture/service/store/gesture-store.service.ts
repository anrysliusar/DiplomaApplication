import {Injectable} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store";
import * as gesture from "./gesture.selectors";
import {updateCurrentLandMark, updateRecognizedGesture} from "./gesture.actions";
import {Gesture} from "../../component/gesture.model";
import {NormalizedLandmark} from "@mediapipe/drawing_utils";

@Injectable()
export class GestureStoreService {

  public readonly recognizedGesture$ = this.store.pipe(select(gesture.selectCurrentGesture));
  public readonly currentLandmarks$ = this.store.pipe(select(gesture.selectCurrentLandmarks));

  constructor(private store: Store<AppState>) {
  }

  public setRecognizedGesture(gesture: Gesture): void {
    this.store.dispatch(updateRecognizedGesture({gesture: gesture}));
  }

  public setCurrentLandmarks(landmarks: NormalizedLandmark[][]): void {
    this.store.dispatch(updateCurrentLandMark({landmarks: landmarks}));
  }
}
