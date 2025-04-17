package com.ivanfranchin.moviesapi.extensions

import com.ivanfranchin.moviesapi.movie.model.Movie
import com.ivanfranchin.moviesapi.movie.model.Movie.Comment
import com.ivanfranchin.moviesapi.movie.dto.MovieDto

fun Movie.toMovieDto(): MovieDto {
    return MovieDto(
        imdbId = imdbId,
        title = title,
        director = director,
        year = year,
        poster = poster,
        comments = comments.map { it.toMovieDtoCommentDto() }
    )
}

fun Comment.toMovieDtoCommentDto(): MovieDto.CommentDto {
    // Placeholder avatar vì bạn cần UserExtraService để lấy avatar thực
    val avatar = "default-avatar.png"  // hoặc để tạm là username luôn
    return MovieDto.CommentDto(
        username = username,
        avatar = avatar,
        text = text,
        timestamp = timestamp
    )
}
