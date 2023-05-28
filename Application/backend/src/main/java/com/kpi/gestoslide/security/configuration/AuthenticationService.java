package com.kpi.gestoslide.security.configuration;

import com.kpi.gestoslide.security.configuration.jwt.JwtUtilService;
import com.kpi.gestoslide.core.domain.model.AppUser;
import com.kpi.gestoslide.core.domain.model.Role;
import com.kpi.gestoslide.core.domain.repository.UserRepository;
import com.kpi.gestoslide.security.dto.authentication.AuthResponseModel;
import com.kpi.gestoslide.security.dto.authentication.LoginModel;
import com.kpi.gestoslide.security.dto.authentication.RegisterModel;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtilService jwtUtilService;
    private final AuthenticationManager authenticationManager;

    public AuthResponseModel register(RegisterModel registerModel) {
        AppUser user = saveNewUser(registerModel);
        String token = jwtUtilService.generateToken(user);
        return new AuthResponseModel(token);
    }

    public AuthResponseModel login(LoginModel loginModel) {
        var authentication = new UsernamePasswordAuthenticationToken(loginModel.username(), loginModel.password());
        authenticationManager.authenticate(authentication);
        var user = userRepository
                .findByUsername(loginModel.username())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        String token = jwtUtilService.generateToken(user);
        return new AuthResponseModel(token);
    }

    private AppUser saveNewUser(RegisterModel registerModel) {
        var user = new AppUser();
        user.setUsername(registerModel.username());
        user.setEmail(registerModel.email());
        user.setPassword(passwordEncoder.encode(registerModel.password()));
        user.setRole(List.of(Role.USER));
        return userRepository.save(user);
    }

    public AppUser getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (Objects.nonNull(auth) && auth.getPrincipal() instanceof AppUser appUser) {
            return appUser;
        }
        throw new IllegalArgumentException("User not found");
    }
}
