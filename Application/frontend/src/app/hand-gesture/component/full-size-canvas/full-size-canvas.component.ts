import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {GestureStoreService} from "../../service/store/gesture-store.service";
import {Subscription} from "rxjs";
import {drawLandmarks, NormalizedLandmark} from "@mediapipe/drawing_utils";
import {CanvasMode} from "../gesture.model";

@Component({
  selector: 'app-full-size-canvas',
  templateUrl: './full-size-canvas.component.html',
  styleUrls: ['./full-size-canvas.component.css']
})
export class FullSizeCanvasComponent implements OnDestroy, AfterViewInit {
  @ViewChild('canvas') canvasElement: ElementRef;
  subscription: Subscription;

  @Input()
  mode: CanvasMode;

  constructor(private gestureStoreService: GestureStoreService) {
  }

  ngAfterViewInit(): void {
    this.subscription = this.gestureStoreService.currentLandmarks$.subscribe(landmarks => {
      if (landmarks.length > 0) this.drawLandmarks(landmarks);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private drawLandmarks(landmarks: NormalizedLandmark[][]) {
    let landmarkToDraw = []
    landmarkToDraw.push(landmarks[0][8])
    const canvasCtx = this.canvasElement.nativeElement.getContext('2d');
    if (this.mode === CanvasMode.Pointer) {
      canvasCtx.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
    }
    drawLandmarks(canvasCtx, landmarkToDraw, {color: '#bd0303', radius: 1});
  }
}
