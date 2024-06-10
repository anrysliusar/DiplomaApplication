package com.kpi.gestoslide.core.domain.repository;

import com.kpi.gestoslide.core.domain.model.Presentation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PresentationRepository extends JpaRepository<Presentation, Long> {
    @Query("SELECT p.id FROM Presentation p WHERE p.project.id = ?1")
    Long findPresentationByProjectId(Long projectId);
}