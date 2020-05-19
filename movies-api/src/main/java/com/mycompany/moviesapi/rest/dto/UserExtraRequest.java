package com.mycompany.moviesapi.rest.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class UserExtraRequest {

    @ApiModelProperty(example = "avatar")
    private String avatar;

}
