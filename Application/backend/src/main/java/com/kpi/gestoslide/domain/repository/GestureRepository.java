package com.kpi.gestoslide.domain.repository;

import com.kpi.gestoslide.domain.model.Gesture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GestureRepository extends JpaRepository<Gesture, Long> {

}
