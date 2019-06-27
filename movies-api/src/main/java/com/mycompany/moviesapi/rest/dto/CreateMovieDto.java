package com.mycompany.moviesapi.rest.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class CreateMovieDto {

  @ApiModelProperty(example = "Resident Evil")
  @NotBlank
  private String title;

  @ApiModelProperty(position = 2, example = "Paul W.S. Anderson")
  @NotBlank
  private String director;

  @ApiModelProperty(position = 3, example = "2002")
  @Positive
  private Integer year;

}