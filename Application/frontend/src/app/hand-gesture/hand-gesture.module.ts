import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestureComponent } from './component/gesture/gesture.component';
import { SlideshowComponent } from './component/slideshow/slideshow.component';
import {ProjectStoreService} from "../projects/service/store/project-store.service";
import {SlideApiService} from "../presentations/service/slide-api.service";
import {AppCommonModule} from "../common/app-common.module";
import {GestureStoreService} from "./service/store/gesture-store.service";
import { FullSizeCanvasComponent } from './component/full-size-canvas/full-size-canvas.component';

@NgModule({
  declarations: [
    GestureComponent,
    SlideshowComponent,
    FullSizeCanvasComponent
  ],
  exports: [
    GestureComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule
  ],
  providers: [ProjectStoreService, SlideApiService, GestureStoreService]
})
export class HandGestureModule { }
