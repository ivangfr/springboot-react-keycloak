package com.ivanfranchin.moviesapi.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserExtraRequest(@Schema(example = "avatar") String avatar) {
}
