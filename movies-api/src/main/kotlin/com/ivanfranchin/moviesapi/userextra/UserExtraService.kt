package com.ivanfranchin.moviesapi.userextra

import com.ivanfranchin.moviesapi.userextra.exception.UserExtraNotFoundException
import com.ivanfranchin.moviesapi.userextra.model.UserExtra
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserExtraService(
    private val userExtraRepository: UserExtraRepository
) {

    fun validateAndGetUserExtra(username: String): UserExtra = getUserExtra(username).orElseThrow {
        UserExtraNotFoundException(
            username
        )
    }

    fun getUserExtra(username: String): Optional<UserExtra> = userExtraRepository.findById(username)

    fun saveUserExtra(userExtra: UserExtra): UserExtra = userExtraRepository.save(userExtra)

}
