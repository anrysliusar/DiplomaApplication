package com.kpi.gestoslide.security.service.usermanagement;

import com.kpi.gestoslide.core.domain.model.AppUser;

import java.util.Optional;

public interface IUserService {
    AppUser save(AppUser user);
    Optional<AppUser> findByUsername(String username);
}
