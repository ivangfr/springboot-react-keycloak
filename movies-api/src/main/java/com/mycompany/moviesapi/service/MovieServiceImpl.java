package com.mycompany.moviesapi.service;

import com.mycompany.moviesapi.exception.MovieNotFoundException;
import com.mycompany.moviesapi.model.Movie;
import com.mycompany.moviesapi.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;

    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    public Movie validateAndGetMovie(String imdbId) {
        return movieRepository.findById(imdbId)
                .orElseThrow(() -> new MovieNotFoundException(String.format("Movie with imdbId '%s' not found", imdbId)));
    }

    @Override
    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    @Override
    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    @Override
    public void deleteMovie(Movie movie) {
        movieRepository.delete(movie);
    }

}