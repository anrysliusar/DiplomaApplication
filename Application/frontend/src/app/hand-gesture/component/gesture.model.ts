export enum Gesture {
  None = 'None',
  Open_Palm = 'Open_Palm',
  Pointing_Up = 'Pointing_Up',
  Thumb_Up = 'Thumb_Up',
  Thumb_Down = 'Thumb_Down',
  Victory = 'Victory',
  Closed_Fist = 'Closed_Fist',
  ILoveYou = 'ILoveYou',
}

export enum CanvasMode {
  Pointer = 'Pointer',
  Draw = 'Draw',
}

export const forVisionTasksBasePath = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
export const forHandLandmarkModelAssetPath = 'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task'
