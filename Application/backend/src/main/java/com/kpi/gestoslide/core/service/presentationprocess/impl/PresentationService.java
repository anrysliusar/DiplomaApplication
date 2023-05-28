package com.kpi.gestoslide.core.service.presentationprocess.impl;

import com.kpi.gestoslide.core.service.presentationprocess.PresentationCDUDService;
import com.kpi.gestoslide.core.domain.model.Presentation;
import com.kpi.gestoslide.core.domain.repository.PresentationRepository;
import com.kpi.gestoslide.core.domain.repository.ProjectRepository;
import com.kpi.gestoslide.core.dto.presentation.PresentationDTO;
import com.kpi.gestoslide.core.mappers.PresentationMapper;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PresentationService implements PresentationCDUDService {
    private final PresentationRepository presentationRepository;
    private final ProjectRepository projectRepository;
    private final PresentationMapper presentationMapper = Mappers.getMapper(PresentationMapper.class);

    @Override
    public PresentationDTO createPresentation(PresentationDTO presentationDTO, Long projectId) {
        var presentation = presentationMapper.presentationDTOToPresentation(presentationDTO);
        var savedPresentation = presentationRepository.save(presentation);
        addPresentationToProject(savedPresentation, projectId);
        return presentationMapper.presentationToPresentationDTO(savedPresentation);
    }

    @Override
    public void deletePresentation(Long id) {
        presentationRepository.findById(id)
                .ifPresent(presentation -> {
                    removePresentationFromProject(presentation);
                    presentationRepository.delete(presentation);
                });
    }

    @Override
    public PresentationDTO updatePresentation(Long id, PresentationDTO presentationDTO) {
        return presentationRepository.findById(id)
                .map(presentation -> {
                    presentation.setName(presentationDTO.name());
                    presentation.setStartDate(presentationMapper.mapToTimestamp(presentationDTO.startDate()));
                    presentation.setEndDate(presentationMapper.mapToTimestamp(presentationDTO.endDate()));
                    return presentationRepository.save(presentation);
                })
                .map(presentationMapper::presentationToPresentationDTO)
                .orElse(null);
    }

    @Override
    public PresentationDTO getPresentation(Long id) {
        return presentationRepository.findById(id)
                .map(presentationMapper::presentationToPresentationDTO)
                .orElse(null);
    }

    private void removePresentationFromProject(Presentation presentation) {
        projectRepository.findById(presentation.getProject().getId())
                .ifPresent(project -> {
                    project.getPresentations().remove(presentation);
                    projectRepository.save(project);
                });
    }

    private void addPresentationToProject(Presentation savedPresentation, Long projectId) {
        projectRepository.findById(projectId)
                .ifPresentOrElse(project -> {
                    savedPresentation.setProject(project);
                    presentationRepository.save(savedPresentation);
                }, () -> {
                    throw new RuntimeException("Project not found");
                });
    }
}
