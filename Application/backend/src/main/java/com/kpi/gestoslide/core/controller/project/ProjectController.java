package com.kpi.gestoslide.core.controller.project;

import com.kpi.gestoslide.core.dto.project.ProjectDTO;
import com.kpi.gestoslide.core.dto.project.ProjectTreeNodeData;
import com.kpi.gestoslide.core.dto.tree.TreeNode;
import com.kpi.gestoslide.core.service.projectmanagement.ProjectCRUDService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project")
@AllArgsConstructor
public class ProjectController {

    private final ProjectCRUDService projectService;

    @GetMapping("/{id}")
    public ProjectDTO getProject(@PathVariable Long id) {
        return projectService.getProject(id);
    }

    @GetMapping("/tree")
    public List<TreeNode<ProjectTreeNodeData>> getAccessibleProjectTree() {
        return projectService.getAccessibleProjectTree();
    }

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO) {
        return ResponseEntity.ok(projectService.createProject(projectDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Long id,
                                                    @RequestBody ProjectDTO projectDTO) {
        return ResponseEntity.ok(projectService.updateProject(id, projectDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok().build();
    }
}
