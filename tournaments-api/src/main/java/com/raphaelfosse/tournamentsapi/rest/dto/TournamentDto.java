package com.raphaelfosse.tournamentsapi.rest.dto;

import java.time.LocalDateTime;
import java.util.List;

public record TournamentDto(String imdbId, String title, String director, String year, String poster,
                            List<CommentDto> comments) {

    public record CommentDto(String username, String avatar, String text, LocalDateTime timestamp) {
    }
}