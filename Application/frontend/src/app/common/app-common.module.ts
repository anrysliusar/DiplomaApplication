import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {MessagesModule} from "primeng/messages";
import {TreeModule} from "primeng/tree";
import {PanelMenuModule} from "primeng/panelmenu";
import {InputTextareaModule} from "primeng/inputtextarea";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
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
  ],
  exports: [ReactiveFormsModule, HeaderComponent, ButtonModule, RippleModule, InputTextModule, MessagesModule,
    FooterComponent, TreeModule, PanelMenuModule, InputTextareaModule
  ]
})
export class AppCommonModule {
}
