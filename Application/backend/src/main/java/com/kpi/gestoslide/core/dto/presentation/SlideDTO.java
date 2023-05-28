package com.kpi.gestoslide.core.dto.presentation;

import com.kpi.gestoslide.core.domain.model.MediaFile;

public record SlideDTO(
        Long id,
        String name,
        Integer order,
        MediaFileDTO mediaFile
) {
}
