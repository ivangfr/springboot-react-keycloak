package com.mycompany.moviesapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "movies")
public class Movie {

  @Id
  private String imdbId;
  private String title;
  private String director;
  private String year;
  private String poster;

}