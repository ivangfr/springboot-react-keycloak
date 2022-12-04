package com.ivanfranchin.moviesapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class MovieNotFoundException extends RuntimeException {

    public MovieNotFoundException(String imdbId) {
        super("Movie with imdbId '%s' not found".formatted(imdbId));
    }
}