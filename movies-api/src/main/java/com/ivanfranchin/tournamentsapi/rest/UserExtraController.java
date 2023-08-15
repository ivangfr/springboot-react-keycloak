package com.ivanfranchin.tournamentsapi.rest;

import com.ivanfranchin.tournamentsapi.model.UserExtra;
import com.ivanfranchin.tournamentsapi.rest.dto.UserExtraRequest;
import com.ivanfranchin.tournamentsapi.service.UserExtraService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Optional;

import static com.ivanfranchin.tournamentsapi.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/userextras")
public class UserExtraController {

    private final UserExtraService userExtraService;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/me")
    public UserExtra getUserExtra(Principal principal) {
        return userExtraService.validateAndGetUserExtra(principal.getName());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping("/me")
    public UserExtra saveUserExtra(@Valid @RequestBody UserExtraRequest updateUserExtraRequest,
                                   Principal principal) {
        Optional<UserExtra> userExtraOptional = userExtraService.getUserExtra(principal.getName());
        UserExtra userExtra = userExtraOptional.orElseGet(() -> new UserExtra(principal.getName()));
        userExtra.setAvatar(updateUserExtraRequest.getAvatar());
        return userExtraService.saveUserExtra(userExtra);
    }
}
