package com.kpi.gestoslide.core.service.slideconfigurator.impl;

import com.kpi.gestoslide.core.domain.model.MediaFile;
import com.kpi.gestoslide.core.domain.model.Slide;
import com.kpi.gestoslide.core.domain.repository.MediaFileRepository;
import com.kpi.gestoslide.core.domain.repository.PresentationRepository;
import com.kpi.gestoslide.core.domain.repository.SlideRepository;
import com.kpi.gestoslide.core.dto.presentation.MediaFileDTO;
import com.kpi.gestoslide.core.dto.presentation.SlideDTO;
import com.kpi.gestoslide.core.mappers.MediaFileMapper;
import com.kpi.gestoslide.core.mappers.PresentationMapper;
import com.kpi.gestoslide.core.service.slideconfigurator.SlideConfigurator;
import com.kpi.gestoslide.security.service.usermanagement.IUserService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.Media;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class SlideConfiguratorService implements SlideConfigurator {

    private final String UPLOAD_DIR = "./uploads/";
    private final PresentationRepository presentationRepository;
    private final MediaFileRepository mediaFileRepository;
    private final SlideRepository slideRepository;
    private final MediaFileMapper mediaFileMapper = Mappers.getMapper(MediaFileMapper.class);


    @Override
    public SlideDTO createSlide(SlideDTO slideDTO, Long presentationId) {
        return presentationRepository.findById(presentationId)
                .map(presentation -> {
                    Slide slide = new Slide();
                    slide.setPresentation(presentation);
                    slide.setSequenceNumber(presentation.getSlides().size());
                    addMediaFileToSlide(slideDTO, slide);
                    return slideRepository.save(slide);
                })
                .map(slide -> {
                    MediaFileDTO mediaFileDTO = mediaFileMapper.mediaFileToMediaFileDTO(slide.getMediaFiles().get(0));
                    return new SlideDTO(slide.getId(), slide.getName(), slide.getSequenceNumber(), mediaFileDTO);
                })
                .orElseThrow(() -> new IllegalArgumentException("Presentation with id " + presentationId + " not found"));
    }

    private void addMediaFileToSlide(SlideDTO slideDTO, Slide slide) {
        mediaFileRepository.findById(slideDTO.mediaFile().id())
                .ifPresentOrElse(mediaFile -> slide.getMediaFiles().add(mediaFile),
                        () -> {throw new IllegalArgumentException("Media file not found");}
                );
    }

    @Override
    public MediaFile uploadFile(MultipartFile file) {
        MediaFile mediaFile = new MediaFile();
        mediaFile.setName(file.getOriginalFilename());
        Path path = saveUploadedFile(file);
        mediaFile.setFilePath(path.toString());
        return mediaFileRepository.save(mediaFile);
    }

    private Path saveUploadedFile(MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                Path dirPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(dirPath)) {
                    Files.createDirectories(dirPath);  // creates directory if it doesn't exist
                }

                Path filePath = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
                return Files.write(filePath, file.getBytes());

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } else {
            throw new IllegalArgumentException("File is empty");
        }
    }
}
