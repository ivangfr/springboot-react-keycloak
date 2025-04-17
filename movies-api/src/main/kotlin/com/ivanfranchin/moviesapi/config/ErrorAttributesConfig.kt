package com.ivanfranchin.moviesapi.config

import org.springframework.boot.web.error.ErrorAttributeOptions
import org.springframework.boot.web.error.ErrorAttributeOptions.Include.*
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes
import org.springframework.boot.web.servlet.error.ErrorAttributes
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.context.request.WebRequest

@Configuration
class ErrorAttributesConfig {

    @Bean
    fun errorAttributes(): ErrorAttributes {
        return object : DefaultErrorAttributes() {
            override fun getErrorAttributes(
                webRequest: WebRequest,
                options: ErrorAttributeOptions
            ): Map<String, Any> {
                return super.getErrorAttributes(
                    webRequest,
                    options.including(EXCEPTION, MESSAGE, BINDING_ERRORS)
                )
            }
        }
    }
}
