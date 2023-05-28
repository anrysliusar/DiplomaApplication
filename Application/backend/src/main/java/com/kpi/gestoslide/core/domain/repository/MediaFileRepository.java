package com.kpi.gestoslide.core.domain.repository;

import com.kpi.gestoslide.core.domain.model.MediaFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaFileRepository extends JpaRepository<MediaFile, Long> {
}
