package com.ivanfranchin.moviesapi.mapper;

import com.ivanfranchin.moviesapi.model.Movie;
import com.ivanfranchin.moviesapi.rest.dto.MovieDto;
import com.ivanfranchin.moviesapi.service.UserExtraService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Component
public class MovieDtoMapperImpl implements MovieDtoMapper {

    private final UserExtraService userExtraService;

    @Override
    public MovieDto toMovieDto(Movie movie) {
        List<MovieDto.CommentDto> comments = movie.getComments().stream()
                .map(this::toMovieDtoCommentDto)
                .toList();

        return new MovieDto(
                movie.getImdbId(),
                movie.getTitle(),
                movie.getDirector(),
                movie.getYear(),
                movie.getPoster(),
                comments
        );
    }

    @Override
    public MovieDto.CommentDto toMovieDtoCommentDto(Movie.Comment comment) {
        String username = comment.getUsername();
        String avatar = userExtraService.getUserExtra(username).isPresent() ?
                userExtraService.getUserExtra(username).get().getAvatar() : username;
        String text = comment.getText();
        LocalDateTime timestamp = comment.getTimestamp();

        return new MovieDto.CommentDto(username, avatar, text, timestamp);
    }
}
