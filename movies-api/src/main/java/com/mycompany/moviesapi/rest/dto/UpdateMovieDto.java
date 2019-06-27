package com.mycompany.moviesapi.rest.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class UpdateMovieDto {

  @ApiModelProperty(example = "Resident Evil: Apocalypse")
  private String title;

  @ApiModelProperty(position = 2, example = "Paul W.S. Anderson")
  private String director;

  @ApiModelProperty(position = 3, example = "2004")
  private Integer year;

}