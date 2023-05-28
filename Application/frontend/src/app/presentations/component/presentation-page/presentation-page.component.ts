import { Component } from '@angular/core';
import {ProjectStoreService} from "../../../projects/service/store/project-store.service";
import {ProjectTreeNode} from "../../../projects/component/project.model";

@Component({
  selector: 'app-presentation-page',
  templateUrl: './presentation-page.component.html',
  styleUrls: ['./presentation-page.component.css']
})
export class PresentationPageComponent {
  selectedNode$: ProjectTreeNode;

  constructor(private projectStoreService: ProjectStoreService) {
    this.projectStoreService.selectedTreeNode$.subscribe(node => {
      this.selectedNode$ = node;
    });
  }
}
