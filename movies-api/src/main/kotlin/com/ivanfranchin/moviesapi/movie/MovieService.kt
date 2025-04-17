package com.ivanfranchin.moviesapi.movie

import com.ivanfranchin.moviesapi.movie.exception.MovieNotFoundException
import com.ivanfranchin.moviesapi.movie.model.Movie
import lombok.RequiredArgsConstructor
import org.springframework.stereotype.Service

@Service
class MovieService(
    private val movieRepository: MovieRepository
) {

    fun validateAndGetMovie(imdbId: String): Movie {
        return movieRepository.findById(imdbId).orElseThrow {
            MovieNotFoundException(
                imdbId
            )
        }
    }

    fun getMovies(): List<Movie> {
        return movieRepository.findAll()
    }

    fun saveMovie(movie: Movie): Movie {
        return movieRepository.save(movie)
    }

    fun deleteMovie(movie: Movie) {
        movieRepository.delete(movie)
    }
}