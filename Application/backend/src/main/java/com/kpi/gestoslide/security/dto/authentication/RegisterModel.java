package com.kpi.gestoslide.security.dto.authentication;

public record RegisterModel(
        String username,
        String email,
        String password
) {
}
