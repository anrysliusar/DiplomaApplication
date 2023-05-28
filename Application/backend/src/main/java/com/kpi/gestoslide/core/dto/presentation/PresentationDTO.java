package com.kpi.gestoslide.core.dto.presentation;

import java.time.LocalDateTime;

public record PresentationDTO(
        Long id,
        String name,
        LocalDateTime startDate,
        LocalDateTime endDate
) {
}
