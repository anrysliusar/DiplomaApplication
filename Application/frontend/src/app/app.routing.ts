import {NgModule} from '@angular/core';

import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./security/component/login/login.component";
import {RegisterComponent} from "./security/component/register/register.component";
import {HomePageComponent} from "./home/component/home-page/home-page.component";
import {AuthGuard} from "./security/service/core/auth.guard";
import {SlideshowComponent} from "./hand-gesture/component/slideshow/slideshow.component";
import {SettingsComponent} from "./settings/components/settings/settings.component";

const routes : Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'slideshow/presentation/:id',
    component: SlideshowComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {
}
