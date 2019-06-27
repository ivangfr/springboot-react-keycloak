package com.mycompany.moviesapi.rest.dto;

import lombok.Data;

@Data
public class MovieDto {

  private String id;
  private String title;
  private String director;
  private Integer year;

}