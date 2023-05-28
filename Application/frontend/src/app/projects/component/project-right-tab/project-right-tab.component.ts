import {Component, OnInit} from "@angular/core";
import {ProjectStoreService} from "../../service/store/project-store.service";
import {ProjectTreeNode, NodeType} from "../project.model";


@Component({
  selector: 'app-project-right-tab',
  templateUrl: './project-right-tab.component.html',
  styleUrls: ['./project-right-tab.component.css']
})
export class ProjectRightTabComponent implements OnInit {
  public NodeType = NodeType;
  selectedNode: ProjectTreeNode;
  header: string;

  constructor(private projectStoreService: ProjectStoreService) {
  }

  ngOnInit() {
    this.handleNodeSelection();
  }

  private handleNodeSelection() {
    this.projectStoreService.selectedTreeNode$.subscribe(node => {
      this.selectedNode = node;
      let nodeType = node.nodeType.toString().toLowerCase();
      if (node.isNew) {
        this.header = "Create new " + nodeType;
      } else {
        this.header = "Edit " + nodeType;
      }
    });
  }

}
