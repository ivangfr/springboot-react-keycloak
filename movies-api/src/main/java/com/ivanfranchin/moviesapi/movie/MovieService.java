package com.ivanfranchin.moviesapi.movie;

import com.ivanfranchin.moviesapi.movie.model.Movie;

import java.util.List;

public interface MovieService {

    Movie validateAndGetMovie(String imdbId);

    List<Movie> getMovies();

    Movie saveMovie(Movie movie);

    void deleteMovie(Movie movie);
}