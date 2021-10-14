package com.mycompany.moviesapi.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class AddCommentRequest {

    @Schema(example = "Very good!")
    @NotBlank
    private String text;
}
