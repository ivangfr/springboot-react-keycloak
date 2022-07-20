package com.ivanfranchin.moviesapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "movies")
public class Movie {

    @Id
    private String imdbId;
    private String title;
    private String director;
    private String year;
    private String poster;
    private List<Comment> comments = new ArrayList<>();

    @Data
    @AllArgsConstructor
    public static class Comment {
        private String username;
        private String text;
        private LocalDateTime timestamp;
    }
}