import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { GestureService } from '../../service/gesture.service';
import { HAND_CONNECTIONS } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

@Component({
  selector: 'app-gesture',
  templateUrl: './gesture.component.html',
  styleUrls: ['./gesture.component.css'],
})
export class GestureComponent implements AfterViewInit, OnDestroy {
  @ViewChild('webcam') webcamElement: ElementRef;
  @ViewChild('canvas') canvasElement: ElementRef;
  @ViewChild('output') outputElement: ElementRef;

  webcamStream: MediaStream;
  webcamRunning = false;

  constructor(private gestureService: GestureService) {}

  async ngAfterViewInit() {
    await this.gestureService.createGestureRecognizer();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: true,
      };
      this.webcamStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.webcamElement.nativeElement.srcObject = this.webcamStream;
    }
  }

  async startGestureRecognition() {
    this.webcamRunning = true;
    await this.gestureService.setRunningMode();
    this.predictWebcam().then();
  }

  async predictWebcam(): Promise<void> {
    if (this.webcamRunning) {
      const results = await this.gestureService.gestureRecognizer.recognizeForVideo(
        this.webcamElement.nativeElement,
        Date.now()
      );

      // Handle result here
      const canvasCtx = this.canvasElement.nativeElement.getContext('2d');
      // Clear the canvas
      canvasCtx.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);

      if (results.landmarks) {
        for (const landmarks of results.landmarks) {
          // Draw connectors and landmarks on the canvas
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#ffea00', lineWidth: 5 });
          drawLandmarks(canvasCtx, landmarks, { color: '#0033ff', lineWidth: 2 });
        }
      }

      if (results.gestures.length > 0) {
        // Output the recognized gesture category and score
        const categoryName = results.gestures[0][0].categoryName;
        const categoryScore = (results.gestures[0][0].score * 100).toFixed(2);
        this.outputElement.nativeElement.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %`;
      }

      requestAnimationFrame(() => this.predictWebcam());
    }
  }

  ngOnDestroy() {
    if (this.webcamStream) {
      this.webcamStream.getTracks().forEach((track) => track.stop());
    }
  }
}

