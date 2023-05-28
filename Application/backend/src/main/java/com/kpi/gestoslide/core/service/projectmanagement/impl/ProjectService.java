package com.kpi.gestoslide.core.service.projectmanagement.impl;

import com.kpi.gestoslide.core.domain.model.AppUser;
import com.kpi.gestoslide.core.domain.model.Presentation;
import com.kpi.gestoslide.core.domain.model.Project;
import com.kpi.gestoslide.core.domain.repository.ProjectRepository;
import com.kpi.gestoslide.core.domain.repository.UserRepository;
import com.kpi.gestoslide.core.dto.project.ProjectDTO;
import com.kpi.gestoslide.core.dto.project.ProjectNodeType;
import com.kpi.gestoslide.core.dto.project.ProjectTreeNodeData;
import com.kpi.gestoslide.core.dto.tree.TreeNode;
import com.kpi.gestoslide.core.mappers.ProjectMapper;
import com.kpi.gestoslide.security.configuration.AuthenticationService;
import com.kpi.gestoslide.core.service.projectmanagement.ProjectCRUDService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ProjectService implements ProjectCRUDService {

    private final AuthenticationService authenticationService;
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper = Mappers.getMapper(ProjectMapper.class);
    private final UserRepository userRepository;

    @Override
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        var project = projectMapper.projectDTOToProject(projectDTO);
        var savedProject = projectRepository.save(project);
        addProjectToUser(savedProject);
        return projectMapper.projectToProjectDTO(savedProject);
    }

    @Override
    public void deleteProject(Long id) {
        var authenticatedUser = authenticationService.getAuthenticatedUser();
        projectRepository.findByUserIdAndProjectId(authenticatedUser.getId(), id)
                .ifPresent(project -> {
                    removeProjectFromUser(authenticatedUser, project.getId());
                    projectRepository.delete(project);
                });
    }

    @Override
    public ProjectDTO updateProject(Long id, ProjectDTO projectDTO) {
        return projectRepository.findById(id)
                .map(project -> {
                    project.setName(projectDTO.name());
                    project.setDescription(projectDTO.description());
                    return projectRepository.save(project);
                })
                .map(projectMapper::projectToProjectDTO)
                .orElse(null);
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
        List<Project> projects = projectRepository.findAllByUserId(user.getId());
        return projects.stream()
                .map(this::mapToTreeNode)
                .toList();
    }

    private TreeNode<ProjectTreeNodeData> mapToTreeNode(Project project) {
        var children = project.getPresentations().stream()
                .map(this::mapToTreeNode)
                .toList();
        var data = new ProjectTreeNodeData(project.getId(), ProjectNodeType.PROJECT);
        return new TreeNode<>(project.getName(), false, true, data, children);

    }

    private TreeNode<ProjectTreeNodeData> mapToTreeNode(Presentation presentation) {
        var data = new ProjectTreeNodeData(presentation.getId(), ProjectNodeType.PRESENTATION);
        return new TreeNode<>(presentation.getName(), true, false, data, List.of());
    }

    private void addProjectToUser(Project project) {
        var authenticatedUser = authenticationService.getAuthenticatedUser();
        userRepository.findById(authenticatedUser.getId())
                .ifPresentOrElse(user -> {
                    user.getProjects().add(project);
                    userRepository.save(authenticatedUser);
                }, () -> {
                    throw new RuntimeException("User not found");
                });
    }

    private void removeProjectFromUser(AppUser authenticatedUser, Long projectId) {
        userRepository.findById(authenticatedUser.getId())
                .ifPresentOrElse(user -> {
                    user.getProjects().removeIf(project -> Objects.equals(project.getId(), projectId));
                    userRepository.save(user);
                }, () -> {
                    throw new RuntimeException("User not found");
                });
    }

}
