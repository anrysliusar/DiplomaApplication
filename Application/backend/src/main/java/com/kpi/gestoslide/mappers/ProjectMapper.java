package com.kpi.gestoslide.mappers;

import com.kpi.gestoslide.domain.model.Project;
import com.kpi.gestoslide.dto.project.ProjectDTO;
import org.mapstruct.Mapper;

@Mapper
public interface ProjectMapper {
    ProjectDTO projectToProjectDTO(Project project);
    Project projectDTOToProject(ProjectDTO project);
}
