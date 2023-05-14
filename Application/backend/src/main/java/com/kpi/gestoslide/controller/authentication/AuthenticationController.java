package com.kpi.gestoslide.controller.authentication;

import com.kpi.gestoslide.dto.authentication.AuthResponseModel;
import com.kpi.gestoslide.dto.authentication.LoginModel;
import com.kpi.gestoslide.dto.authentication.RegisterModel;
import com.kpi.gestoslide.security.authentication.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseModel> register(@RequestBody RegisterModel registerModel) {
        return ResponseEntity.ok(authenticationService.register(registerModel));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseModel> login(@RequestBody LoginModel loginModel) {
        return ResponseEntity.ok(authenticationService.login(loginModel));
    }

}
