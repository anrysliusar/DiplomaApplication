package com.kpi.gestoslide.service.projectmanagement;

import com.kpi.gestoslide.dto.project.ProjectDTO;
import com.kpi.gestoslide.dto.project.ProjectTreeNodeData;
import com.kpi.gestoslide.dto.tree.TreeNode;

import java.util.List;

public interface ProjectCRUDService {
    ProjectDTO createProject(ProjectDTO projectDTO);
    void deleteProject(Long id);
    void updateProject(ProjectDTO projectDTO);
    ProjectDTO getProject(Long id);

    List<TreeNode<ProjectTreeNodeData>> getAccessibleProjectTree();
}
