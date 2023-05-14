package com.kpi.gestoslide.dto.authentication;

public record RegisterModel(
        String username,
        String email,
        String password
) {
}
