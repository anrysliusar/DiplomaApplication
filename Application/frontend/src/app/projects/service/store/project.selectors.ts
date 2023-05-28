import {createSelector} from "@ngrx/store";
import {AppState} from "../../../store";

export const selectTreeConfig = (state: AppState) => state.treeConfig;
export const selectedTreeNodeState = createSelector(selectTreeConfig, (state) => state.selectedProjectTreeNode);
export const selectIsDoUpdateState = createSelector(selectTreeConfig, (state) => state.doUpdate);
