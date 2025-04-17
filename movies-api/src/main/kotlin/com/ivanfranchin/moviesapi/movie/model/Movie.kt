package com.ivanfranchin.moviesapi.movie.model

import com.ivanfranchin.moviesapi.movie.dto.CreateMovieRequest
import com.ivanfranchin.moviesapi.userextra.dto.MovieDTO
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.Instant

@Document(collection = "movies")
class Movie {

    @Id
    var imdbId: String? = null
    var title: String? = null
    var director: String? = null
    var year: String? = null
    var poster: String? = null
    var comments: MutableList<Comment> = mutableListOf()

    class Comment(
        var username: String,
        var text: String,
        var timestamp: Instant
    )

    companion object {
        fun from(createMovieRequest: CreateMovieRequest): Movie {
            val movie = Movie()
            movie.imdbId = createMovieRequest.imdbId()
            movie.title = createMovieRequest.title()
            movie.director = createMovieRequest.director()
            movie.year = createMovieRequest.year()
            movie.poster = createMovieRequest.poster()
            return movie
        }

        fun updateFrom(updateMovieRequest: MovieDTO.UpdateMovieRequest, movie: Movie) {
            updateMovieRequest.title.let { movie.title = it }
            updateMovieRequest.director.let { movie.director = it }
            updateMovieRequest.year.let { movie.year = it }
            updateMovieRequest.poster.let { movie.poster = it }
        }
    }
}
