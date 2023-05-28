package com.kpi.gestoslide.core.domain.repository;

import com.kpi.gestoslide.core.domain.model.GestureAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GestureActionRepository extends JpaRepository<GestureAction, Long> {

}
