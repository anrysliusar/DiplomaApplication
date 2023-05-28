import {Component, OnInit} from '@angular/core';
import {TreeNode} from "primeng/api";
import {NodeType, ProjectTreeNode} from "../project.model";
import {ProjectStoreService} from "../../service/store/project-store.service";
import {ProjectApiService} from "../../service/project-api.service";


@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.css'],
  providers: [ProjectApiService]
})
export class ProjectTreeComponent implements OnInit {
  items: TreeNode<ProjectTreeNode>[];

  constructor(private projectStoreService: ProjectStoreService,
              private projectApiService: ProjectApiService) {
  }

  ngOnInit() {
    this.loadTreeData();
    this.handleTreeReload();
  }

  private loadTreeData(): void {
    this.projectApiService.getProjectsTree().subscribe(data => {
      data.forEach(node => {
        if (node.data.nodeType === NodeType.PROJECT) {
          node.children?.push(this.getAddPresentationNode(node.data.id));
        }
      });
      this.items = [...data, this.getAddProjectNode()];
    });
  }

  nodeSelect(data: ProjectTreeNode): void {
    this.projectStoreService.setSelectedTreeNode(data);
  }

  private handleTreeReload() {
    this.projectStoreService.isDoUpdate$.subscribe(doUpdate => {
      if (doUpdate) {
        this.loadTreeData();
        this.projectStoreService.setDoUpdate(false);
      }
    });
  }

  getAddProjectNode(): TreeNode<ProjectTreeNode> {
    return {
      label: '+ Add Project',
      leaf: true,
      data: {id: -1, nodeType: NodeType.PROJECT, isNew: true},
    };
  }

  getAddPresentationNode(projectId: number): TreeNode<ProjectTreeNode> {
    return {
      label: '+ Add Presentation',
      leaf: true,
      data: {id: -1, nodeType: NodeType.PRESENTATION, isNew: true, parentId: projectId},
    };
  }
}
