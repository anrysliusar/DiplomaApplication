package com.kpi.gestoslide.core.domain.repository;

import com.kpi.gestoslide.core.domain.model.Action;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActionRepository extends JpaRepository<Action, Long> {

}
