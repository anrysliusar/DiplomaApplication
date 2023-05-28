package com.kpi.gestoslide.core.controller.presentation;

import com.kpi.gestoslide.core.dto.presentation.PresentationDTO;
import com.kpi.gestoslide.core.service.presentationprocess.PresentationCDUDService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/presentation")
@AllArgsConstructor
public class PresentationController {
    private final PresentationCDUDService presentationService;

    @GetMapping("/{id}")
    public PresentationDTO getPresentation(@PathVariable Long id) {
        return presentationService.getPresentation(id);
    }

    @PostMapping
    public ResponseEntity<PresentationDTO> createPresentation(@RequestParam Long projectId,
                                                              @RequestBody PresentationDTO presentation) {
        return ResponseEntity.ok(presentationService.createPresentation(presentation, projectId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PresentationDTO> updatePresentation(@PathVariable Long id,
                                                              @RequestBody PresentationDTO presentation) {
        return ResponseEntity.ok(presentationService.updatePresentation(id, presentation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePresentation(@PathVariable Long id) {
        presentationService.deletePresentation(id);
        return ResponseEntity.ok().build();
    }
}
