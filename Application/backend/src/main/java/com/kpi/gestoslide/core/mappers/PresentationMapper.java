package com.kpi.gestoslide.core.mappers;

import com.kpi.gestoslide.core.domain.model.Presentation;
import com.kpi.gestoslide.core.dto.presentation.PresentationDTO;
import org.mapstruct.Mapper;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Objects;

@Mapper
public interface PresentationMapper {

    PresentationDTO presentationToPresentationDTO(Presentation presentation);
    Presentation presentationDTOToPresentation(PresentationDTO presentationDTO);

    default LocalDateTime mapToLocalDateTime(Timestamp timestamp) {
        return Objects.nonNull(timestamp)? timestamp.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime() : null;
    }

    default Timestamp mapToTimestamp(LocalDateTime localDateTime) {
        return Objects.nonNull(localDateTime)? Timestamp.from(localDateTime.atZone(ZoneId.of("UTC")).toInstant()) : null;
    }
}
