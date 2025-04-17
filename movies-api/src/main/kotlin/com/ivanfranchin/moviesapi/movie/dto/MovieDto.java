package com.ivanfranchin.moviesapi.movie.dto;

import java.time.Instant;
import java.util.List;

public record MovieDto(String imdbId, String title, String director, String year, String poster,
                       List<CommentDto> comments) {

    public record CommentDto(String username, String avatar, String text, Instant timestamp) {
    }
}