package com.mycompany.moviesapi.service;

import java.util.List;

import com.mycompany.moviesapi.model.Movie;

public interface MovieService {

  Movie validateAndGetMovie(String imdbId);

  List<Movie> getMovies();

  Movie saveMovie(Movie movie);

  void deleteMovie(Movie movie);

}