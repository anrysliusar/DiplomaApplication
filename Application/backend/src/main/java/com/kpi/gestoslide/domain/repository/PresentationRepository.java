package com.kpi.gestoslide.domain.repository;

import com.kpi.gestoslide.domain.model.Presentation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PresentationRepository extends JpaRepository<Presentation, Long> {

}
