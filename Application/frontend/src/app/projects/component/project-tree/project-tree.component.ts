import {Component, OnInit} from '@angular/core';
import {TreeNode} from "primeng/api";
import {NodeType, ProjectTreeNode} from "../project.model";
import {ProjectStoreService} from "../../service/store/project-store.service";


@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.css']
})
export class ProjectTreeComponent implements OnInit {
  items: TreeNode<ProjectTreeNode>[];

  constructor(private projectStoreService: ProjectStoreService) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Project 1',
        expanded: true,
        data: {id: 1, nodeType: NodeType.PROJECT},
        children: [
          {
            label: 'Presentation',
            data: {id: 1, nodeType: NodeType.PRESENTATION},
            expanded: true,
          }
        ],
      },
      {
        label: 'Project 2',
        expanded: true,
        data: {id: 2, nodeType: NodeType.PROJECT},
        children: [
          {
            label: 'Presentation',
            data: {id: 2, nodeType: NodeType.PRESENTATION},
            expanded: true,
          }
        ],
      },
      this.getAddProjectNode()

    ];

  }

  nodeSelect(data: ProjectTreeNode) {
    this.projectStoreService.setSelectedTreeNode(data);
  }

  getAddProjectNode(): TreeNode<ProjectTreeNode> {
    return {
      label: '+ Add Project',
      leaf: true,
      data: {id: -1, nodeType: NodeType.PROJECT, isNew: true},
    };
  }

  getAddPresentationNode(): TreeNode<ProjectTreeNode> {
    return {
      label: '+ Add Presentation',
      leaf: true,
      data: {id: -1, nodeType: NodeType.PRESENTATION, isNew: true},
    };
  }
}
