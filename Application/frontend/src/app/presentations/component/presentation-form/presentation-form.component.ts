import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NodeType, ProjectTreeNode} from "../../../projects/component/project.model";
import {ProjectStoreService} from "../../../projects/service/store/project-store.service";
import {ProjectApiService} from "../../../projects/service/project-api.service";
import {PresentationApiService} from "../../service/presentation-api.service";
import {Presentation} from "../presentation.model";

@Component({
  selector: 'app-presentation-form',
  templateUrl: './presentation-form.component.html',
  styleUrls: ['./presentation-form.component.css'],
  providers: [ProjectApiService, PresentationApiService]
})
export class PresentationFormComponent implements OnInit {
  formGroup: FormGroup;
  selectedNode: ProjectTreeNode;

  constructor(private projectStoreService: ProjectStoreService,
              private presentationApiService: PresentationApiService) { }

  ngOnInit() {
    this.initForm();
    this.handleNodeSelection();
  }

  private handleNodeSelection() {
    this.projectStoreService.selectedTreeNode$.subscribe(node => {
      this.selectedNode = node;
      if (node.isNew) {
        this.formGroup.reset();
      } else {
        this.presentationApiService.getPresentation(node.id).subscribe(presentation => {
          this.patchPresentation(presentation);
        })
      }
    });
  }

  private initForm() {
    this.formGroup = new FormGroup<any>({
      name: new FormControl('', Validators.required),
      startDate: new FormControl(),
      endDate: new FormControl()
    });
  }

  save(): void {
    if (this.selectedNode.isNew) {
      this.presentationApiService.savePresentation(this.selectedNode.parentId!, this.formGroup.value)
        .subscribe((presentation) => this.onCreatePresentationResponse(presentation));
    } else {
      this.presentationApiService.updatePresentation(this.selectedNode.id, this.formGroup.value)
        .subscribe((presentation) => this.onUpdatePresentationResponse(presentation));
    }
  }

  delete(): void {
    this.presentationApiService.deletePresentation(this.selectedNode.id)
      .subscribe(() => this.onDeletePresentationResponse());
  }

  private onUpdatePresentationResponse(presentation: Presentation): void {
    this.patchPresentation(presentation);
    this.reloadTree();
  }

  private onCreatePresentationResponse(presentation: Presentation): void {
    this.patchPresentation(presentation);
    this.projectStoreService.setSelectedTreeNode({nodeType: NodeType.PRESENTATION, id: presentation.id, isNew: false})
    this.reloadTree();
  }

  private onDeletePresentationResponse(): void {
    this.formGroup.reset();
    this.projectStoreService.resetState();
    this.reloadTree();
  }

  private patchPresentation(presentation: Presentation): void {
    this.formGroup.patchValue({
      name: presentation.name,
      startDate: new Date(presentation.startDate),
      endDate: new Date(presentation.endDate)
    });
  }

  private reloadTree(): void {
    this.projectStoreService.setDoUpdate(true);
  }

}
