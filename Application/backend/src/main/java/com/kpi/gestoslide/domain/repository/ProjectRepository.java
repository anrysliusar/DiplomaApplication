package com.kpi.gestoslide.domain.repository;

import com.kpi.gestoslide.domain.model.AppUser;
import com.kpi.gestoslide.domain.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("""
            SELECT P FROM Project P
            JOIN P.users U
            JOIN FETCH P.presentations
            WHERE U = :user""")
    List<Project> findAllByUser(AppUser user);
}
