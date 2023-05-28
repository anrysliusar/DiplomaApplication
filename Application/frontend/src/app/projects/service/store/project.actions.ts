import { createAction, props } from '@ngrx/store';
import {ProjectTreeNode} from "../../component/project.model";

export const updateSelectedProjectTreeNode = createAction('[Tree] Update selected node', props<{ selectedNode: ProjectTreeNode }>());
export const updateIsDoUpdate = createAction('[Tree] Update is do update', props<{ doUpdate: boolean }>());
export const resetTreeState = createAction('[Tree] Reset state');
