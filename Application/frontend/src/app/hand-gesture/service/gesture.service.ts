import { Injectable } from '@angular/core';
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';
import {forHandLandmarkModelAssetPath, forVisionTasksBasePath} from "../component/gesture.model";

@Injectable({
  providedIn: 'root',
})
export class GestureService {
  public gestureRecognizer: GestureRecognizer;

  async createGestureRecognizer() {
    const vision = await FilesetResolver.forVisionTasks(forVisionTasksBasePath);
    this.gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {modelAssetPath: forHandLandmarkModelAssetPath, delegate: 'GPU'},
      runningMode: "VIDEO",
    });
  }

}
