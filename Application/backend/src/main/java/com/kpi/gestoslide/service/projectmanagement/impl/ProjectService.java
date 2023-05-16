package com.kpi.gestoslide.service.projectmanagement.impl;

import com.kpi.gestoslide.domain.model.Presentation;
import com.kpi.gestoslide.domain.model.Project;
import com.kpi.gestoslide.domain.repository.ProjectRepository;
import com.kpi.gestoslide.dto.project.ProjectDTO;
import com.kpi.gestoslide.dto.project.ProjectNodeType;
import com.kpi.gestoslide.dto.project.ProjectTreeNodeData;
import com.kpi.gestoslide.dto.tree.TreeNode;
import com.kpi.gestoslide.mappers.ProjectMapper;
import com.kpi.gestoslide.security.authentication.AuthenticationService;
import com.kpi.gestoslide.service.projectmanagement.ProjectCRUDService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService implements ProjectCRUDService {

    private final AuthenticationService authenticationService;
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper = Mappers.getMapper(ProjectMapper.class);

    @Override
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        var user = authenticationService.getAuthenticatedUser();
        Project project = projectMapper.projectDTOToProject(projectDTO);
        project.setUsers(List.of(user));
        Project saved = projectRepository.save(project);
        return projectMapper.projectToProjectDTO(saved);
    }

    @Override
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public void updateProject(ProjectDTO projectDTO) {
        projectRepository.findById(projectDTO.id())
                .ifPresent(project -> {
                    project.setName(projectDTO.name());
                    project.setDescription(projectDTO.description());
                    projectRepository.save(project);
                });
    }

    @Override
    public ProjectDTO getProject(Long id) {
        return projectRepository.findById(id)
                .map(projectMapper::projectToProjectDTO)
                .orElse(null);
    }

    @Override
    public List<TreeNode<ProjectTreeNodeData>> getAccessibleProjectTree() {
        var user = authenticationService.getAuthenticatedUser();
        List<Project> projects = projectRepository.findAllByUser(user);
        return projects.stream()
                .map(this::mapToTreeNode)
                .toList();
    }

    private TreeNode<ProjectTreeNodeData> mapToTreeNode(Project project) {
        var children = project.getPresentations().stream()
                .map(this::mapToTreeNode)
                .toList();
        var data = new ProjectTreeNodeData(project.getId(), ProjectNodeType.PROJECT);
        return new TreeNode<>(project.getName(), false, data, children);

    }

    private TreeNode<ProjectTreeNodeData> mapToTreeNode(Presentation presentation) {
        var data = new ProjectTreeNodeData(presentation.getId(), ProjectNodeType.PRESENTATION);
        return new TreeNode<>(presentation.getName(), true, data, List.of());
    }

}
