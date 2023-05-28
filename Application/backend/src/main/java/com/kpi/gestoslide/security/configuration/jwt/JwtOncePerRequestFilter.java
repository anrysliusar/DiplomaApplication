package com.kpi.gestoslide.security.configuration.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtOncePerRequestFilter extends OncePerRequestFilter {
    private final String BEARER = "Bearer ";
    private final String AUTHORIZATION = "Authorization";
    private final UserDetailsService userDetailsService;
    private final JwtUtilService jwtUtilService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        final String authorizationHeader = request.getHeader(AUTHORIZATION);

        if (Objects.nonNull(authorizationHeader) && authorizationHeader.startsWith(BEARER)) {
            String jwt = authorizationHeader.substring(BEARER.length());
            String username = jwtUtilService.extractUsername(jwt);

            if (Objects.nonNull(username) && Objects.isNull(SecurityContextHolder.getContext().getAuthentication())) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                if (jwtUtilService.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authenticationToken = getAuthenticationToken(userDetails);
                    authenticationToken.setDetails(getWebAuthenticationDetails(request));
                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authenticationToken);
                }
            }
        }
        filterChain.doFilter(request, response);
    }

    private WebAuthenticationDetails getWebAuthenticationDetails(HttpServletRequest request) {
        return new WebAuthenticationDetailsSource().buildDetails(request);
    }

    private UsernamePasswordAuthenticationToken getAuthenticationToken(UserDetails userDetails) {
        return new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities());
    }
}