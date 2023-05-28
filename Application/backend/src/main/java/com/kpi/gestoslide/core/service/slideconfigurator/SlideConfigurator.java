package com.kpi.gestoslide.core.service.slideconfigurator;

import com.kpi.gestoslide.core.domain.model.MediaFile;
import com.kpi.gestoslide.core.dto.presentation.SlideDTO;
import org.springframework.web.multipart.MultipartFile;

public interface SlideConfigurator {
    SlideDTO createSlide(SlideDTO slideDTO, Long presentationId);
    MediaFile uploadFile(MultipartFile file);
}
