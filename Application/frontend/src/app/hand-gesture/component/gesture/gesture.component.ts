import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {GestureService} from '../../service/gesture.service';
import {HAND_CONNECTIONS} from '@mediapipe/hands';
import {drawConnectors, drawLandmarks} from '@mediapipe/drawing_utils';
import {Gesture} from "../gesture.model";
import {GestureStoreService} from "../../service/store/gesture-store.service";
import {GestureRecognizerResult} from "@mediapipe/tasks-vision";

@Component({
  selector: 'app-gesture',
  templateUrl: './gesture.component.html',
  styleUrls: ['./gesture.component.css'],
})
export class GestureComponent implements AfterViewInit, OnDestroy {
  @ViewChild('webcam') webcamElement: ElementRef;
  @ViewChild('canvas') canvasElement: ElementRef;
  @ViewChild('gestureName') gestureName: ElementRef;

  mediaStream: MediaStream;
  isCameraStarted = false;

  delay = 20;
  counter = 0;
  isGestureUpdated = false;


  constructor(private gestureService: GestureService,
              private gestureStoreService: GestureStoreService) {
  }

  async ngAfterViewInit() {
    await this.gestureService.initRecognizer();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: true,
      };
      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.webcamElement.nativeElement.srcObject = this.mediaStream;
    } else {
      alert('No camera available');
    }
  }

  async startGestureRecognition() {
    this.isCameraStarted = true;
    this.recognize().then();
  }

  async recognize(): Promise<void> {
    if (this.isCameraStarted) {
      const results = await this.gestureService.recognizer.recognizeForVideo(
        this.webcamElement.nativeElement,
        Date.now()
      );

      const canvas = this.canvasElement.nativeElement.getContext('2d');
      // Clear the canvas
      canvas.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);

      if (results.landmarks) {
        for (const resultLandmarks of results.landmarks) {
          drawConnectors(canvas, resultLandmarks, HAND_CONNECTIONS, {color: '#ffea00', lineWidth: 5});
          drawLandmarks(canvas, resultLandmarks, {color: '#0033ff', lineWidth: 2});
        }
        this.gestureStoreService.setCurrentLandmarks(results.landmarks);
      }
      if (results.gestures.length > 0) {
        this.handleResults(results);
      }
      this.handleGestureUpdate();
      requestAnimationFrame(() => this.recognize());
    }
  }

  private handleResults(results: GestureRecognizerResult): void {
    const gesture = <Gesture>results.gestures[0][0].categoryName;
    this.gestureName.nativeElement.innerText = `Gesture name: ${gesture.toString()}`;
    if (!this.isGestureUpdated) {
      this.gestureStoreService.setRecognizedGesture(gesture);
      this.isGestureUpdated = true;
    }
  }

  private handleGestureUpdate() {
    if (this.isGestureUpdated) {
      this.counter++;
      this.gestureStoreService.setRecognizedGesture(Gesture.None);
      if (this.counter === this.delay) {
        this.counter = 0;
        this.isGestureUpdated = false;
      }
    }
  }

  ngOnDestroy() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }
  }
}

