package com.ivanfranchin.moviesapi.movie;

import com.ivanfranchin.moviesapi.movie.exception.MovieNotFoundException;
import com.ivanfranchin.moviesapi.movie.model.Movie;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public Movie validateAndGetMovie(String imdbId) {
        return movieRepository.findById(imdbId).orElseThrow(() -> new MovieNotFoundException(imdbId));
    }

    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public void deleteMovie(Movie movie) {
        movieRepository.delete(movie);
    }
}