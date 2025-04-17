package com.ivanfranchin.moviesapi.movie

import com.ivanfranchin.moviesapi.movie.dto.AddCommentRequest
import com.ivanfranchin.moviesapi.movie.dto.CreateMovieRequest
import com.ivanfranchin.moviesapi.movie.dto.MovieDto
import com.ivanfranchin.moviesapi.movie.mapper.MovieDtoMapper
import com.ivanfranchin.moviesapi.movie.model.Movie
import com.ivanfranchin.moviesapi.userextra.dto.MovieDTO
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.security.Principal
import java.time.Instant

@RestController
@RequestMapping("/api/movies")
class MoviesController(
    private val movieService: MovieService,
    private val movieMapper: MovieDtoMapper
) {

    @GetMapping
    fun getMovies(): List<MovieDto> {
        return movieService.getMovies().map { movieMapper.toMovieDto(it) }
    }

    @GetMapping("/{imdbId}")
    fun getMovie(@PathVariable imdbId: String): MovieDto {
        val movie = movieService.validateAndGetMovie(imdbId)
        return movieMapper.toMovieDto(movie)
    }

    @Operation(security = [SecurityRequirement(name = com.ivanfranchin.moviesapi.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)])
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    fun createMovie(@Valid @RequestBody createMovieRequest: CreateMovieRequest): MovieDto {
        val movie = Movie.from(createMovieRequest)
        val savedMovie = movieService.saveMovie(movie)
        return movieMapper.toMovieDto(savedMovie)
    }

    @Operation(security = [SecurityRequirement(name = com.ivanfranchin.moviesapi.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)])
    @PutMapping("/{imdbId}")
    fun updateMovie(
        @PathVariable imdbId: String,
        @Valid @RequestBody updateMovieRequest: MovieDTO.UpdateMovieRequest
    ): MovieDto {
        val movie = movieService.validateAndGetMovie(imdbId)
        Movie.updateFrom(updateMovieRequest, movie)
        val updatedMovie = movieService.saveMovie(movie)
        return movieMapper.toMovieDto(updatedMovie)
    }

    @Operation(security = [SecurityRequirement(name = com.ivanfranchin.moviesapi.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)])
    @DeleteMapping("/{imdbId}")
    fun deleteMovie(@PathVariable imdbId: String): MovieDto {
        val movie = movieService.validateAndGetMovie(imdbId)
        movieService.deleteMovie(movie)
        return movieMapper.toMovieDto(movie)
    }

    @Operation(security = [SecurityRequirement(name = com.ivanfranchin.moviesapi.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)])
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{imdbId}/comments")
    fun addMovieComment(
        @PathVariable imdbId: String,
        @Valid @RequestBody addCommentRequest: AddCommentRequest,
        principal: Principal
    ): MovieDto {
        val movie = movieService.validateAndGetMovie(imdbId)
        val comment = Movie.Comment(
            username = principal.name,
            text = addCommentRequest.text,
            timestamp = Instant.now()
        )
        movie.comments.add(0, comment) // Kotlin's equivalent of addFirst
        val updatedMovie = movieService.saveMovie(movie)
        return movieMapper.toMovieDto(updatedMovie)
    }
}
