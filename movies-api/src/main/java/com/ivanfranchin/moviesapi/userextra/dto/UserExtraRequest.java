package com.ivanfranchin.moviesapi.userextra.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserExtraRequest(@Schema(example = "avatar") String avatar) {
}
