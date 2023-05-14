import { createAction, props } from '@ngrx/store';
import {ProjectTreeNode} from "../../component/project.model";

export const updateSelectedProjectTreeNode = createAction('[Tree] Update selected node', props<{ selectedNode: ProjectTreeNode }>());
