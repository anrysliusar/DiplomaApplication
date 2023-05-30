package com.kpi.gestoslide.core.service.slideconfigurator.impl;

import com.kpi.gestoslide.core.domain.model.MediaFile;
import com.kpi.gestoslide.core.domain.model.Slide;
import com.kpi.gestoslide.core.domain.repository.MediaFileRepository;
import com.kpi.gestoslide.core.domain.repository.PresentationRepository;
import com.kpi.gestoslide.core.domain.repository.SlideRepository;
import com.kpi.gestoslide.core.dto.presentation.MediaFileDTO;
import com.kpi.gestoslide.core.dto.presentation.SlideDTO;
import com.kpi.gestoslide.core.mappers.MediaFileMapper;
import com.kpi.gestoslide.core.service.slideconfigurator.SlideConfigurator;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.NoSuchElementException;

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
                    Slide saved = slideRepository.save(slide);
                    addMediaFileToSlide(slideDTO, saved);
                    return saved;
                })
                .map(this::mapToSlideDTO)
                .orElseThrow(() -> new IllegalArgumentException("Presentation with id " + presentationId + " not found"));
    }

    @Override
    public MediaFile uploadFile(MultipartFile file) {
        MediaFile mediaFile = new MediaFile();
        mediaFile.setName(file.getOriginalFilename());
        Path path = saveUploadedFile(file);
        mediaFile.setFilePath(path.toString());
        return mediaFileRepository.save(mediaFile);
    }

    @Override
    public List<SlideDTO> getSlides(Long presentationId) {
        return slideRepository.findByPresentationId(presentationId)
                .stream()
                .filter(slide -> !slide.getMediaFiles().isEmpty())
                .map(this::mapToSlideDTO)
                .toList();
    }

    private SlideDTO mapToSlideDTO(Slide slide) {
        MediaFile mediaFile = slide.getMediaFiles().get(0);
        MediaFileDTO mediaFileDTO = new MediaFileDTO(mediaFile.getId(), mediaFile.getName(), mediaFile.getFilePath());
        return new SlideDTO(slide.getId(), slide.getName(), slide.getSequenceNumber(), mediaFileDTO);
    }

    @Override
    public SlideDTO getSlide(Long slideId) {
        return slideRepository.findById(slideId)
                .map(this::mapToSlideDTO)
                .orElseThrow(NoSuchElementException::new);
    }

    @Override
    public void deleteSlide(Long slideId) {
        slideRepository.findById(slideId)
                .ifPresent(slide -> {
                    removePresentationFromProject(slide);
                    reorderSlides(slide);
                    slideRepository.delete(slide);
                });
    }

    private void reorderSlides(Slide slide) {
        List<Slide> slides = slideRepository.findByPresentationId(slide.getPresentation().getId());
        slides.stream()
                .filter(s -> s.getSequenceNumber() > slide.getSequenceNumber())
                .forEach(s -> s.setSequenceNumber(s.getSequenceNumber() - 1));
        slideRepository.saveAll(slides);
    }

    private void addMediaFileToSlide(SlideDTO slideDTO, Slide slide) {
        mediaFileRepository.findById(slideDTO.mediaFile().id())
                .ifPresentOrElse(mediaFile -> {
                            mediaFile.setSlide(slide);
                            slide.getMediaFiles().add(mediaFile);
                            mediaFileRepository.save(mediaFile);
                        },
                        () -> {throw new IllegalArgumentException("Media file not found");}
                );
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

    private void removePresentationFromProject(Slide slide) {
        presentationRepository.findById(slide.getPresentation().getId())
                .ifPresent(presentation -> {
                    presentation.getSlides().remove(slide);
                    presentationRepository.save(presentation);
                });
    }
}
