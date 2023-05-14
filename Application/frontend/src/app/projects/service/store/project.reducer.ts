import {createReducer, on} from '@ngrx/store';

import {NodeType, ProjectTreeNode} from "../../component/project.model";
import {updateSelectedProjectTreeNode} from "./project.actions";

export interface TreeState {
  selectedProjectTreeNode: ProjectTreeNode

}

export const initialState: TreeState = {
  selectedProjectTreeNode: {
    isNew: false,
    id: -1,
    nodeType: NodeType.PROJECT
  }
};

export const projectTreeReducer = createReducer(
  initialState,
  on(updateSelectedProjectTreeNode, (state, {selectedNode}) => ({
    ...state,
    selectedProjectTreeNode: selectedNode
  }))
);

