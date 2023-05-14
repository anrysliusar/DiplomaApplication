import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {PasswordModule} from "primeng/password";
import {AuthInterceptor} from "./service/core/auth.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AppCommonModule} from "../common/app-common.module";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent],
  imports: [
    AppCommonModule,
    CommonModule,
    PasswordModule
  ],
  exports: [LoginComponent, RegisterComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]})
export class SecurityModule { }
