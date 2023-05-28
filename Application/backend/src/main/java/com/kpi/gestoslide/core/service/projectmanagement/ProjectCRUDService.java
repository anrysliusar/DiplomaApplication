package com.kpi.gestoslide.core.service.projectmanagement;

import com.kpi.gestoslide.core.dto.project.ProjectDTO;
import com.kpi.gestoslide.core.dto.project.ProjectTreeNodeData;
import com.kpi.gestoslide.core.dto.tree.TreeNode;

import java.util.List;

public interface ProjectCRUDService {
    ProjectDTO createProject(ProjectDTO projectDTO);
    void deleteProject(Long id);
    ProjectDTO updateProject(Long id, ProjectDTO projectDTO);
    ProjectDTO getProject(Long id);

    List<TreeNode<ProjectTreeNodeData>> getAccessibleProjectTree();
}
