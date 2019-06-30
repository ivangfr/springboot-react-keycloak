package com.mycompany.moviesapi.rest.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class UpdateMovieDto {

  @ApiModelProperty(example = "Resident Evil: Apocalypse")
  private String title;

  @ApiModelProperty(position = 2, example = "Paul W.S. Anderson", notes = "Set \"N/A\" if the director of the movie is unknown")
  private String director;

  @ApiModelProperty(position = 3, example = "2004", notes = "Set \"N/A\" if the year of the movie is unknown")
  private String year;

  @ApiModelProperty(position = 4, example = "https://m.media-amazon.com/images/M/MV5BMTc1NTUxMzk0Nl5BMl5BanBnXkFtZTcwNDQ1MDIzMw@@._V1_SX300.jpg")
  private String poster;

}