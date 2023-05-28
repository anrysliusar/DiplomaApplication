package com.kpi.gestoslide.core.domain.repository;

import com.kpi.gestoslide.core.domain.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("""
            SELECT P FROM Project P
            JOIN P.users U
            WHERE U.id = ?1""")
    List<Project> findAllByUserId(Long userId);

    @Query("""
            SELECT P FROM Project P
            JOIN P.users U
            WHERE U.id = ?1 AND P.id = ?2""")
    Optional<Project> findByUserIdAndProjectId(Long userId, Long projectId);
}
