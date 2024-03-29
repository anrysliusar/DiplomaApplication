import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './component/header/header.component';
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {MessagesModule} from "primeng/messages";
import {TreeModule} from "primeng/tree";
import {PanelMenuModule} from "primeng/panelmenu";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {TabViewModule} from "primeng/tabview";
import {GalleriaModule} from "primeng/galleria";
import {FileUploadModule} from "primeng/fileupload";
import {CarouselModule} from "primeng/carousel";
import {ImageModule} from "primeng/image";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    TabViewModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MenubarModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    MessagesModule,
    TreeModule,
    PanelMenuModule,
    InputTextareaModule,
    CalendarModule,
    GalleriaModule,
    FileUploadModule,
    CarouselModule,
    ImageModule,
  ],
  exports: [ReactiveFormsModule, HeaderComponent, ButtonModule, RippleModule, InputTextModule, MessagesModule,
    TreeModule, PanelMenuModule, InputTextareaModule, CalendarModule, TabViewModule, GalleriaModule,
    FileUploadModule, CarouselModule, ImageModule,
  ]
})
export class AppCommonModule {
}
