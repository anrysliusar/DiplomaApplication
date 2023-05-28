import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestureComponent } from './component/gesture/gesture.component';



@NgModule({
  declarations: [
    GestureComponent
  ],
  exports: [
    GestureComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HandGestureModule { }
