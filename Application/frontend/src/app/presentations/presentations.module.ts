import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PresentationFormComponent} from './component/presentation-form/presentation-form.component';
import {AppCommonModule} from "../common/app-common.module";
import { PresentationPageComponent } from './component/presentation-page/presentation-page.component';
import { SlideConfiguratorComponent } from './component/slide-configurator/slide-configurator.component';
import {GalleriaModule} from "primeng/galleria";
import {FileUploadModule} from "primeng/fileupload";
import {CarouselModule} from "primeng/carousel";
import {ImageModule} from "primeng/image";


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
    GalleriaModule,
    FileUploadModule,
    CarouselModule,
    ImageModule,
  ]
})
export class PresentationsModule {
}
