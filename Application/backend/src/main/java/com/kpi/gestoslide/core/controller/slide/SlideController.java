package com.kpi.gestoslide.core.controller.slide;

import com.kpi.gestoslide.core.domain.model.MediaFile;
import com.kpi.gestoslide.core.dto.presentation.SlideDTO;
import com.kpi.gestoslide.core.service.slideconfigurator.SlideConfigurator;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController()
@RequestMapping("/api/slides")
@RequiredArgsConstructor
public class SlideController {

    private final SlideConfigurator slideConfigurator;

    @PostMapping("/upload")
    public MediaFile uploadFile(@RequestBody MultipartFile slide) {
        return slideConfigurator.uploadFile(slide);
    }

    @PostMapping
    public void createSlide(@RequestBody SlideDTO slideDTO,
                            @RequestParam Long presentationId) {
        slideConfigurator.createSlide(slideDTO, presentationId);
    }


}