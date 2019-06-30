package com.mycompany.moviesapi.rest.dto;

import javax.validation.constraints.NotBlank;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class CreateMovieDto {

  @ApiModelProperty(example = "tt0120804")
  @NotBlank
  private String imdbId;

  @ApiModelProperty(position = 2, example = "Resident Evil")
  @NotBlank
  private String title;

  @ApiModelProperty(position = 3, example = "Paul W.S. Anderson", notes = "Set \"N/A\" if the director of the movie is unknown")
  @NotBlank
  private String director;

  @ApiModelProperty(position = 4, example = "2002", notes = "Set \"N/A\" if the year of the movie is unknown")
  @NotBlank
  private String year;

  @ApiModelProperty(position = 5, example = "https://m.media-amazon.com/images/M/MV5BN2Y2MTljNjMtMDRlNi00ZWNhLThmMWItYTlmZjYyZDk4NzYxXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg")
  @NotBlank
  private String poster;

}