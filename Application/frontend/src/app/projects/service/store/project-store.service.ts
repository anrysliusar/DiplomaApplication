import {Injectable} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store";
import * as project from "./project.selectors";
import {updateSelectedProjectTreeNode} from "./project.actions";
import {ProjectTreeNode} from "../../component/project.model";

@Injectable()
export class ProjectStoreService {

  public readonly selectedTreeNode$ = this.store.pipe(select(project.selectedTreeNodeState));

  constructor(private store: Store<AppState>) {
  }

  public setSelectedTreeNode(node: ProjectTreeNode): void {
    this.store.dispatch(updateSelectedProjectTreeNode({selectedNode: node}));
  }

}
