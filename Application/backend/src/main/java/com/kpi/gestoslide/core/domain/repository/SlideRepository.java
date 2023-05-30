package com.kpi.gestoslide.core.domain.repository;

import com.kpi.gestoslide.core.domain.model.Slide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SlideRepository extends JpaRepository<Slide, Long> {
    List<Slide> findByPresentationId(Long presentationId);
}
