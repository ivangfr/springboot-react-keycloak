package com.mycompany.moviesapi.rest.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class MovieDto {

    private String imdbId;
    private String title;
    private String director;
    private String year;
    private String poster;
    private List<CommentDto> comments;

    @Data
    public static class CommentDto {
        private String username;
        private String avatar;
        private String text;
        private LocalDateTime timestamp;
    }
}