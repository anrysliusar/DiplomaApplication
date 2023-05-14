import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectStoreService} from "../../service/store/project-store.service";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private projectStoreService: ProjectStoreService) {
    this.initForm();
  }

  ngOnInit() {
    this.projectStoreService.selectedTreeNode$.subscribe(node => {
      if (node) {
        this.formGroup.reset({name: node.id.toString(), description: node.nodeType.toString()});
      } else {

      }
    });
  }

  private initForm() {
    this.formGroup = new FormGroup<any>({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }

  save() {

  }
}
