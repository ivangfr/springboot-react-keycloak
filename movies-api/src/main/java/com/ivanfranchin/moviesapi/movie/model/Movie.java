package com.ivanfranchin.moviesapi.movie.model;

import com.ivanfranchin.moviesapi.movie.dto.CreateMovieRequest;
import com.ivanfranchin.moviesapi.userextra.dto.UpdateMovieRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
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
        private Instant timestamp;
    }

    public static Movie from(CreateMovieRequest createMovieRequest) {
        Movie movie = new Movie();
        movie.setImdbId(createMovieRequest.imdbId());
        movie.setTitle(createMovieRequest.title());
        movie.setDirector(createMovieRequest.director());
        movie.setYear(createMovieRequest.year());
        movie.setPoster(createMovieRequest.poster());
        return movie;
    }

    public static void updateFrom(UpdateMovieRequest updateMovieRequest, Movie movie) {
        if (updateMovieRequest.title() != null) {
            movie.setTitle(updateMovieRequest.title());
        }
        if (updateMovieRequest.director() != null) {
            movie.setDirector(updateMovieRequest.director());
        }
        if (updateMovieRequest.year() != null) {
            movie.setYear(updateMovieRequest.year());
        }
        if (updateMovieRequest.poster() != null) {
            movie.setPoster(updateMovieRequest.poster());
        }
    }
}