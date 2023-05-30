package com.kpi.gestoslide.core.service.slideconfigurator;

import com.kpi.gestoslide.core.domain.model.MediaFile;
import com.kpi.gestoslide.core.dto.presentation.SlideDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SlideConfigurator {
    SlideDTO createSlide(SlideDTO slideDTO, Long presentationId);
    MediaFile uploadFile(MultipartFile file);

    List<SlideDTO> getSlides(Long presentationId);

    SlideDTO getSlide(Long slideId);

    void deleteSlide(Long slideId);
}
