import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectStoreService} from "../../service/store/project-store.service";
import {ProjectTreeNode, NodeType, Project} from "../project.model";
import {ProjectApiService} from "../../service/project-api.service";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  formGroup: FormGroup;
  selectedNode: ProjectTreeNode;

  constructor(private projectStoreService: ProjectStoreService,
              private projectApiService: ProjectApiService) {
  }

  ngOnInit() {
    this.initForm();
    this.handleNodeSelection();
  }

  private handleNodeSelection(): void {
    this.projectStoreService.selectedTreeNode$.subscribe(node => {
      this.selectedNode = node;
      if (node.isNew) {
        this.formGroup.reset();
      } else {
        this.projectApiService.getProject(node.id).subscribe(project => {
          this.formGroup.patchValue(project);
        })
      }
    });
  }

  private initForm(): void {
    this.formGroup = new FormGroup<any>({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }

  save(): void {
    if (this.selectedNode.isNew) {
      this.projectApiService.saveProject(this.formGroup.value)
        .subscribe((project) => this.onCreateProjectResponse(project));
    } else {
      this.projectApiService.updateProject(this.selectedNode.id, this.formGroup.value)
        .subscribe((project) => this.onUpdateProjectResponse(project));

    }
  }

  delete(): void {
    this.projectApiService.deleteProject(this.selectedNode.id)
      .subscribe(() => this.onDeleteProjectResponse());
  }

  private onUpdateProjectResponse(project: Project): void {
    this.formGroup.reset(project);
    this.reloadTree()
  }

  private onCreateProjectResponse(project: Project): void {
    this.formGroup.reset(project);
    this.projectStoreService.setSelectedTreeNode({nodeType: NodeType.PROJECT, id: project.id, isNew: false})
    this.reloadTree()
  }

  private onDeleteProjectResponse(): void {
    this.formGroup.reset();
    this.projectStoreService.resetState();
    this.reloadTree()
  }

  private reloadTree(): void {
    this.projectStoreService.setDoUpdate(true);
  }
}
