import { NgModule } from '@angular/core';
import { ProjectPageComponent } from './component/project-page/project-page.component';
import {RouterModule, Routes} from "@angular/router";


const routes : Routes = [
  {
    path: '',
    component: ProjectPageComponent
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {
}
