package com.kpi.gestoslide.security.authentication;

import com.kpi.gestoslide.configuration.security.jwt.JwtUtilService;
import com.kpi.gestoslide.domain.model.AppUser;
import com.kpi.gestoslide.domain.model.Role;
import com.kpi.gestoslide.domain.repository.UserRepository;
import com.kpi.gestoslide.dto.authentication.AuthResponseModel;
import com.kpi.gestoslide.dto.authentication.LoginModel;
import com.kpi.gestoslide.dto.authentication.RegisterModel;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

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
        user.setRoles(List.of(Role.USER));
        return userRepository.save(user);
    }
}
