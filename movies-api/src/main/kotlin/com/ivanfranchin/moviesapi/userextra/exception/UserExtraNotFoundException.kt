package com.ivanfranchin.moviesapi.userextra.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.NOT_FOUND)
class UserExtraNotFoundException(username: String?) :
    RuntimeException("UserExtra of $username not found")
