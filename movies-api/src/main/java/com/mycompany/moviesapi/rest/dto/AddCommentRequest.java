package com.mycompany.moviesapi.rest.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class AddCommentRequest {

    @ApiModelProperty(example = "Very good!")
    @NotBlank
    private String text;

}
