package com.kpi.gestoslide.domain.repository;

import com.kpi.gestoslide.domain.model.Slide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlideRepository extends JpaRepository<Slide, Long> {
}
