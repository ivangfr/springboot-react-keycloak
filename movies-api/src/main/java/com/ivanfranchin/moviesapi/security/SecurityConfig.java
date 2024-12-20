package com.ivanfranchin.moviesapi.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@RequiredArgsConstructor
@Configuration
public class SecurityConfig {

    private final JwtAuthConverter jwtAuthConverter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests
                        .requestMatchers(HttpMethod.GET, "/api/movies", "/api/movies/**").permitAll()
                        .requestMatchers("/api/movies/*/comments").hasAnyRole(MOVIES_ADMIN, MOVIES_USER)
                        .requestMatchers("/api/movies", "/api/movies/**").hasRole(MOVIES_ADMIN)
                        .requestMatchers("/api/userextras/me").hasAnyRole(MOVIES_ADMIN, MOVIES_USER)
                        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs", "/v3/api-docs/**").permitAll()
                        .anyRequest().authenticated())
                .oauth2ResourceServer(oauth2ResourceServer -> oauth2ResourceServer.jwt(
                        jwt -> jwt.jwtAuthenticationConverter(jwtAuthConverter)))
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

    public static final String MOVIES_ADMIN = "MOVIES_ADMIN";
    public static final String MOVIES_USER = "MOVIES_USER";
}