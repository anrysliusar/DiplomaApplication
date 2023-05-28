package com.kpi.gestoslide.core.mappers;

import com.kpi.gestoslide.core.domain.model.MediaFile;
import com.kpi.gestoslide.core.dto.presentation.MediaFileDTO;
import org.mapstruct.Mapper;

@Mapper
public interface MediaFileMapper {
    MediaFile mediaFileDTOToMediaFile(MediaFileDTO mediaFile);
    MediaFileDTO mediaFileToMediaFileDTO(MediaFile mediaFile);
}
