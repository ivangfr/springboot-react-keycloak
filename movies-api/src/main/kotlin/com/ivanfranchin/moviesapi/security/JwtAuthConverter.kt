package com.ivanfranchin.moviesapi.security

import jakarta.validation.constraints.NotBlank
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.core.convert.converter.Converter
import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.jwt.JwtClaimNames
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter
import org.springframework.stereotype.Component
import org.springframework.validation.annotation.Validated

@Component
class JwtAuthConverter(
    private val properties: JwtAuthConverterProperties
) : Converter<Jwt, AbstractAuthenticationToken> {

    override fun convert(jwt: Jwt): AbstractAuthenticationToken {
        val authorities = mutableSetOf<GrantedAuthority>()
        authorities += jwtGrantedAuthoritiesConverter.convert(jwt).orEmpty()
        authorities += extractResourceRoles(jwt)

        val principalClaim = properties.principalAttribute ?: JwtClaimNames.SUB
        val principal = jwt.getClaim<String>(principalClaim)

        return JwtAuthenticationToken(jwt, authorities, principal)
    }

    private fun extractResourceRoles(jwt: Jwt): Collection<GrantedAuthority> {
        val resourceAccess = jwt.getClaim<Map<String, Any>?>("resource_access") ?: return emptySet()

        val resource = resourceAccess[properties.resourceId] as? Map<*, *> ?: return emptySet()
        val roles = resource["roles"] as? Collection<*> ?: return emptySet()

        return roles.filterIsInstance<String>().map { SimpleGrantedAuthority("ROLE_$it") }.toSet()
    }

    companion object {
        private val jwtGrantedAuthoritiesConverter = JwtGrantedAuthoritiesConverter()
    }
}

@Validated
@Configuration
@ConfigurationProperties(prefix = "jwt.auth.converter")
class JwtAuthConverterProperties {
    @NotBlank
    lateinit var resourceId: String
    var principalAttribute: String? = null
}
