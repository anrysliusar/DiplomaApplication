package com.kpi.gestoslide.service.usermanagement;

import com.kpi.gestoslide.domain.model.AppUser;
import com.kpi.gestoslide.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public AppUser save(AppUser user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<AppUser> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
