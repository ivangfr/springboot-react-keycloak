package com.ivanfranchin.moviesapi.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class UserExtraRequest {

    @Schema(example = "avatar")
    private String avatar;
}
