package com.kpi.gestoslide.controller.project;

import com.kpi.gestoslide.dto.project.ProjectDTO;
import com.kpi.gestoslide.dto.project.ProjectTreeNodeData;
import com.kpi.gestoslide.dto.tree.TreeNode;
import com.kpi.gestoslide.service.projectmanagement.ProjectCRUDService;
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
    public ResponseEntity<ProjectDTO> getProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProject(id));
    }

    @GetMapping("/tree")
    public ResponseEntity<List<TreeNode<ProjectTreeNodeData>>> getAccessibleProjectTree() {
        return ResponseEntity.ok(projectService.getAccessibleProjectTree());
    }

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO) {
        return ResponseEntity.ok(projectService.createProject(projectDTO));
    }

    @PutMapping
    public ResponseEntity<Void> updateProject(@RequestBody ProjectDTO projectDTO) {
        projectService.updateProject(projectDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok().build();
    }
}
