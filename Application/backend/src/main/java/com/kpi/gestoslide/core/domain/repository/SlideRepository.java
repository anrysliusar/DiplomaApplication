package com.kpi.gestoslide.core.domain.repository;

import com.kpi.gestoslide.core.domain.model.Slide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlideRepository extends JpaRepository<Slide, Long> {
}
