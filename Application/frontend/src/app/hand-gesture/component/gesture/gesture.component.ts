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
  @ViewChild('result') resultElement: ElementRef;

  elementPosition: string;

  mediaStream: MediaStream;
  isCameraStarted = false;

  delay = 20;
  counter = 0;
  isGestureUpdated = false;


  constructor(private gestureService: GestureService,
              private gestureStoreService: GestureStoreService) {
  }

  async ngAfterViewInit() {
    await this.gestureService.createGestureRecognizer();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: true,
      };
      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.webcamElement.nativeElement.srcObject = this.mediaStream;
    }
  }

  async startGestureRecognition() {
    this.isCameraStarted = true;
    this.startRecognition().then();
  }

  async startRecognition(): Promise<void> {
    if (this.isCameraStarted) {
      const results = await this.gestureService.gestureRecognizer.recognizeForVideo(
        this.webcamElement.nativeElement,
        Date.now()
      );

      const canvasCtx = this.canvasElement.nativeElement.getContext('2d');
      // Clear the canvas
      canvasCtx.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);

      if (results.landmarks) {
        for (const landmarks of results.landmarks) {
          // Draw connectors and landmarks on the canvas
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {color: '#ffea00', lineWidth: 5});
          drawLandmarks(canvasCtx, landmarks, {color: '#0033ff', lineWidth: 2});
        }
      }

      if (results.gestures.length > 0) {
        this.handleResults(results);
      }
      if (results.worldLandmarks) {
        this.gestureStoreService.setCurrentLandmarks(results.landmarks);
      }

      this.handleGestureUpdate();

      requestAnimationFrame(() => this.startRecognition());
    }
  }

  private handleResults(results: GestureRecognizerResult): void {
    const gesture = <Gesture>results.gestures[0][0].categoryName;
    this.resultElement.nativeElement.innerText = `Gesture: ${gesture.toString()}`;
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

