import { Component } from '@angular/core';
import {ProjectStoreService} from "../../../projects/service/store/project-store.service";
import {ProjectTreeNode} from "../../../projects/component/project.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-presentation-page',
  templateUrl: './presentation-page.component.html',
  styleUrls: ['./presentation-page.component.css']
})
export class PresentationPageComponent {
  selectedNode$: ProjectTreeNode;

  constructor(private projectStoreService: ProjectStoreService,
              private router: Router) {
    this.projectStoreService.selectedTreeNode$.subscribe(node => {
      this.selectedNode$ = node;
    });
  }

  navigateToSlideShow() {
    this.router.navigate(['/slideshow/presentation/' + this.selectedNode$.id]).then();
  }

  navigateToSettings() {
    this.router.navigate(['/settings']).then();
  }
}
