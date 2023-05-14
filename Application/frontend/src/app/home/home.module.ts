import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './component/home-page/home-page.component';
import {AppCommonModule} from "../common/app-common.module";

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule
  ],
  exports: [HomePageComponent]
})
export class HomeModule { }
