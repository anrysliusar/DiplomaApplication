import {createReducer, on} from '@ngrx/store';

import {NodeType, ProjectTreeNode} from "../../component/project.model";
import {resetTreeState, updateIsDoUpdate, updateSelectedProjectTreeNode} from "./project.actions";

export interface TreeState {
  selectedProjectTreeNode: ProjectTreeNode,
  doUpdate: boolean
}

export const initialState: TreeState = {
  selectedProjectTreeNode: {
    isNew: false,
    id: -1,
    nodeType: NodeType.PROJECT
  },
  doUpdate: false
};

export const projectTreeReducer = createReducer(
  initialState,
  on(updateSelectedProjectTreeNode, (state, {selectedNode}) => ({
    ...state,
    selectedProjectTreeNode: selectedNode
  })),
  on(updateIsDoUpdate, (state, {doUpdate}) => ({
    ...state,
    doUpdate: doUpdate
  })),
  on(resetTreeState, () => ({
    ...initialState,
  }))
);

