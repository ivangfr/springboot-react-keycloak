package com.ivanfranchin.moviesapi.userextra.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record UpdateMovieRequest(
        @Schema(example = "Resident Evil: Apocalypse") String title,
        @Schema(example = "Paul W.S. Anderson", description = "Set \"N/A\" if the director of the movie is unknown") String director,
        @Schema(example = "2004", description = "Set \"N/A\" if the year of the movie is unknown") String year,
        @Schema(example = "https://m.media-amazon.com/images/M/MV5BMTc1NTUxMzk0Nl5BMl5BanBnXkFtZTcwNDQ1MDIzMw@@._V1_SX300.jpg") String poster) {
}