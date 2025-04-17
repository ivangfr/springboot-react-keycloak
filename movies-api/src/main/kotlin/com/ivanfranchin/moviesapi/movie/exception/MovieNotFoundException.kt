package com.ivanfranchin.moviesapi.movie.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.NOT_FOUND)
class MovieNotFoundException(imdbId: String?) :
    RuntimeException("Movie with imdbId $imdbId not found")