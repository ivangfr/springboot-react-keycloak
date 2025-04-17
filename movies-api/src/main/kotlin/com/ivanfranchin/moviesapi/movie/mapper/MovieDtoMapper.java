package com.ivanfranchin.moviesapi.movie.mapper;

import com.ivanfranchin.moviesapi.movie.dto.MovieDto;
import com.ivanfranchin.moviesapi.movie.model.Movie;
import com.ivanfranchin.moviesapi.userextra.UserExtraService;
import com.ivanfranchin.moviesapi.userextra.model.UserExtra;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

@RequiredArgsConstructor
@Component
public class MovieDtoMapper {

    private final UserExtraService userExtraService;

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

    public MovieDto.CommentDto toMovieDtoCommentDto(Movie.Comment comment) {
        String username = comment.getUsername();
        String avatar = getAvatarForUser(username);
        String text = comment.getText();
        Instant timestamp = comment.getTimestamp();

        return new MovieDto.CommentDto(username, avatar, text, timestamp);
    }

    private String getAvatarForUser(String username) {
        return userExtraService.getUserExtra(username)
                .map(UserExtra::getAvatar)
                .orElse(username);
    }
}
