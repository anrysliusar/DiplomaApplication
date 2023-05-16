export enum NodeType {
  PROJECT = 'PROJECT',
  PRESENTATION = 'PRESENTATION',
}

export interface ProjectTreeNode {
  id: number;
  nodeType: NodeType;
  isNew?: boolean;
}

export interface Project {
  id: number;
  name: string;
  description: string;
}

