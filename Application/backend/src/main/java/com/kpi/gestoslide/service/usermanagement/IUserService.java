package com.kpi.gestoslide.service.usermanagement;

import com.kpi.gestoslide.domain.model.AppUser;

import java.util.Optional;

public interface IUserService {
    AppUser save(AppUser user);
    Optional<AppUser> findByUsername(String username);
}
