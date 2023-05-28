package com.kpi.gestoslide.core.service.presentationprocess;

import com.kpi.gestoslide.core.dto.presentation.PresentationDTO;

public interface PresentationCDUDService {
    PresentationDTO createPresentation(PresentationDTO presentationDTO, Long projectId);
    void deletePresentation(Long id);
    PresentationDTO updatePresentation(Long id, PresentationDTO presentationDTO);
    PresentationDTO getPresentation(Long id);
}
