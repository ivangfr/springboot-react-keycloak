package com.ivanfranchin.moviesapi.rest.dto;

import java.time.LocalDateTime;
import java.util.List;

public record MovieDto(String imdbId, String title, String director, String year, String poster,
                       List<CommentDto> comments) {

    public record CommentDto(String username, String avatar, String text, LocalDateTime timestamp) {
    }
}