import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './component/home-page/home-page.component';
import {AppCommonModule} from "../common/app-common.module";
import {HandGestureModule} from "../hand-gesture/hand-gesture.module";
import {StepsModule} from "primeng/steps";

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    HandGestureModule,
    StepsModule,
  ],
  exports: [HomePageComponent]
})
export class HomeModule { }
