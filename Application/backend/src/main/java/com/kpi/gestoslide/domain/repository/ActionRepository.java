package com.kpi.gestoslide.domain.repository;

import com.kpi.gestoslide.domain.model.Action;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActionRepository extends JpaRepository<Action, Long> {

}
