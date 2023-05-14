import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app.routing";
import {HomeModule} from "./home/home.module";
import {SecurityModule} from "./security/security.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StoreModule} from "@ngrx/store";
import {effects, reducers} from "./store";
import {EffectsModule} from "@ngrx/effects";
import {AppCommonModule} from "./common/app-common.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppCommonModule,
    HomeModule,
    SecurityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
