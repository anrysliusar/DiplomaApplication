package com.kpi.gestoslide.domain.repository;

import com.kpi.gestoslide.domain.model.GestureAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GestureActionRepository extends JpaRepository<GestureAction, Long> {

}
