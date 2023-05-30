import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PresentationFormComponent} from './component/presentation-form/presentation-form.component';
import {AppCommonModule} from "../common/app-common.module";
import { PresentationPageComponent } from './component/presentation-page/presentation-page.component';
import { SlideConfiguratorComponent } from './component/slide-configurator/slide-configurator.component';


@NgModule({
  declarations: [
    PresentationFormComponent,
    PresentationPageComponent,
    SlideConfiguratorComponent
  ],
  exports: [
    PresentationFormComponent,
    PresentationPageComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
  ]
})
export class PresentationsModule {
}
