package com.ivanfranchin.moviesapi.userextra

import com.ivanfranchin.moviesapi.config.SwaggerConfig
import com.ivanfranchin.moviesapi.userextra.dto.UserExtraDTO
import com.ivanfranchin.moviesapi.userextra.model.UserExtra
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping("/api/userextras")
class UserExtraController(
    private val userExtraService: UserExtraService
) {

    @Operation(security = [SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)])
    @GetMapping("/me")
    fun getUserExtra(principal: Principal): UserExtra {
        return userExtraService.validateAndGetUserExtra(principal.name)
    }

    @Operation(security = [SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)])
    @PostMapping("/me")
    fun saveUserExtra(
        @RequestBody updateUserExtraRequest: @Valid UserExtraDTO.UserExtraRequest,
        principal: Principal
    ): UserExtra {
        val userExtraOptional = userExtraService.getUserExtra(principal.name)
        val userExtra = userExtraOptional.orElseGet { UserExtra(principal.name) }
        userExtra.avatar = updateUserExtraRequest.avatar
        return userExtraService.saveUserExtra(userExtra)
    }
}
