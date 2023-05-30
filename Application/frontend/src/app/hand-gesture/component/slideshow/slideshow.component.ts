import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Slide} from "../../../presentations/component/presentation.model";
import {SlideApiService} from "../../../presentations/service/slide-api.service";
import {CanvasMode, Gesture} from "../gesture.model";
import {GestureStoreService} from "../../service/store/gesture-store.service";

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit {
  Slide = Slide;
  presentationId: number;
  slides: Slide[] = [];
  activeIndex: number = 0;

  currentGesture: Gesture = Gesture.None;

  activeCanvas: boolean = false;
  canvasMode: CanvasMode = CanvasMode.Pointer;
  @ViewChild('canvas') canvasElement: ElementRef;


  constructor(private activatedRoute: ActivatedRoute,
              private slideApiService: SlideApiService,
              private gestureStoreService: GestureStoreService) {
    this.gestureStoreService.recognizedGesture$.subscribe(gesture => {
      this.currentGesture = gesture;
      this.handleGestureChange();
    });

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.presentationId = params['id'];
      this.loadSlides();
    });
  }

  private loadSlides(): void {
    this.slideApiService.getSlides(this.presentationId)
      .subscribe((slides: Slide[]) => {
          this.slides = slides;
        }
      );
  }

  private handleGestureChange() {
    switch (this.currentGesture) {
      case Gesture.None:
        break;
      case Gesture.Thumb_Up:
        this.nextSlide();
        break;
      case Gesture.Thumb_Down:
        this.previousSlide();
        break;
      case Gesture.Pointing_Up:
        this.activatePointer();
        break;
      case Gesture.Victory:
        this.activateDrawing();
        break;
      case Gesture.Open_Palm:
        this.activeCanvas = false;
        break;
      case Gesture.Closed_Fist:
        this.activeIndex = this.slides.length - 1;
        break;
    }
  }

  private activateDrawing() {
    if (!this.activeCanvas || this.canvasMode !== CanvasMode.Pointer) {
      this.activeCanvas = true;
      this.canvasMode = CanvasMode.Draw;
    }
  }

  private activatePointer() {
    if (!this.activeCanvas || this.canvasMode !== CanvasMode.Draw) {
      this.activeCanvas = true;
      this.canvasMode = CanvasMode.Pointer;
    }
  }

  private previousSlide() {
    if (this.activeIndex > 0) {
      this.activeIndex -= 1;
    }
  }

  private nextSlide() {
    if (this.activeIndex < this.slides.length - 1) {
      this.activeIndex += 1;
    }
  }
}
