package com.ivanfranchin.moviesapi.userextra.dto

import io.swagger.v3.oas.annotations.media.Schema

class UserExtraDTO {

    data class UserExtraRequest(
        @Schema(example = "avatar") val avatar: String
    )


}