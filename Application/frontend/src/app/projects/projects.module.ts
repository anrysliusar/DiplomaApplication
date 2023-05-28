import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPageComponent } from './component/project-page/project-page.component';
import { ProjectTreeComponent } from './component/project-tree/project-tree.component';
import { ProjectFormComponent } from './component/project-form/project-form.component';
import {ProjectsRoutingModule} from "./projects.routing";
import {AppCommonModule} from "../common/app-common.module";
import {ProjectStoreService} from "./service/store/project-store.service";
import {PresentationsModule} from "../presentations/presentations.module";
import { ProjectRightTabComponent } from './component/project-right-tab/project-right-tab.component';

@NgModule({
  declarations: [
    ProjectPageComponent,
    ProjectTreeComponent,
    ProjectFormComponent,
    ProjectRightTabComponent
  ],
    imports: [
        ProjectsRoutingModule,
        AppCommonModule,
        CommonModule,
        PresentationsModule,
    ],
  providers: [ProjectStoreService]
})
export class ProjectsModule { }
