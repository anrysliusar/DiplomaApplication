import { Injectable } from '@angular/core';
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';
import {forHandLandmarkModelAssetPath, forVisionTasksBasePath} from "../component/gesture.model";

@Injectable()
export class GestureService {
  public gestureRecognizer: GestureRecognizer;

  async initRecognizer() {
    const vision = await FilesetResolver.forVisionTasks(forVisionTasksBasePath);
    this.gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {modelAssetPath: forHandLandmarkModelAssetPath, delegate: 'GPU'},
      runningMode: "VIDEO",
    });
  }

}
