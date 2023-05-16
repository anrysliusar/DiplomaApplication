package com.kpi.gestoslide.controller;

import com.kpi.gestoslide.domain.model.AppUser;
import com.kpi.gestoslide.security.authentication.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@AllArgsConstructor
public class Test {

    private final AuthenticationService authenticationService;

    @GetMapping("/hello")
    public String hello() {
        AppUser authenticatedUser = authenticationService.getAuthenticatedUser();
        return "Hello, " + authenticatedUser.getUsername();
    }
}
