package com.kpi.gestoslide.core.controller.slide;

import com.kpi.gestoslide.core.domain.model.MediaFile;
import com.kpi.gestoslide.core.dto.presentation.SlideDTO;
import com.kpi.gestoslide.core.service.slideconfigurator.SlideConfigurator;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
    public SlideDTO createSlide(@RequestBody SlideDTO slideDTO,
                            @RequestParam Long presentationId) {
        return slideConfigurator.createSlide(slideDTO, presentationId);
    }

    @GetMapping("/{slideId}")
    public SlideDTO getSlide(@PathVariable Long slideId) {
        return slideConfigurator.getSlide(slideId);
    }

    @GetMapping()
    public List<SlideDTO> getSlides(@RequestParam Long presentationId) {
        return slideConfigurator.getSlides(presentationId);
    }

    @DeleteMapping("/{slideId}")
    public void deleteSlide(@PathVariable Long slideId) {
        slideConfigurator.deleteSlide(slideId);
    }


}