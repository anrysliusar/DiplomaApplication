import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import {AppCommonModule} from "../common/app-common.module";



@NgModule({
  declarations: [
    SettingsComponent
  ],
    imports: [
        CommonModule,
        AppCommonModule
    ]
})
export class SettingsModule { }
