import { Injectable } from '@angular/core';
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';

@Injectable({
  providedIn: 'root',
})
export class GestureService {
  public gestureRecognizer: GestureRecognizer;

  async createGestureRecognizer() {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
    );
    this.gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
        delegate: 'GPU',
      },
      runningMode: "VIDEO",
    });
  }

  async setRunningMode() {
    await this.gestureRecognizer.setOptions({ runningMode: "VIDEO" });
  }
}
