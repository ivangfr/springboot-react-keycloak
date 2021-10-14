package com.mycompany.moviesapi.service;

import com.mycompany.moviesapi.model.Movie;

import java.util.List;

public interface MovieService {

    Movie validateAndGetMovie(String imdbId);

    List<Movie> getMovies();

    Movie saveMovie(Movie movie);

    void deleteMovie(Movie movie);
}