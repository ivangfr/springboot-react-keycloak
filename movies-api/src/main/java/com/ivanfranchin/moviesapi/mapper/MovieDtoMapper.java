package com.ivanfranchin.moviesapi.mapper;

import com.ivanfranchin.moviesapi.model.Movie;
import com.ivanfranchin.moviesapi.rest.dto.MovieDto;

public interface MovieDtoMapper {

    MovieDto toMovieDto(Movie movie);

    MovieDto.CommentDto toMovieDtoCommentDto(Movie.Comment comment);
}