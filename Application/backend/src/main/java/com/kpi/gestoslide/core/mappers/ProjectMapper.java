package com.kpi.gestoslide.core.mappers;

import com.kpi.gestoslide.core.domain.model.Project;
import com.kpi.gestoslide.core.dto.project.ProjectDTO;
import org.mapstruct.Mapper;

@Mapper
public interface ProjectMapper {
    ProjectDTO projectToProjectDTO(Project project);
    Project projectDTOToProject(ProjectDTO project);
}
