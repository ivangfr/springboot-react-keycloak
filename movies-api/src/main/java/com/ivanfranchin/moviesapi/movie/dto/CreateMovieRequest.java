package com.ivanfranchin.moviesapi.movie.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record CreateMovieRequest(
        @Schema(example = "tt0120804") @NotBlank String imdbId,
        @Schema(example = "Resident Evil") @NotBlank String title,
        @Schema(example = "Paul W.S. Anderson", description = "Set \"N/A\" if the director of the movie is unknown") @NotBlank String director,
        @Schema(example = "2002", description = "Set \"N/A\" if the year of the movie is unknown") @NotBlank String year,
        @Schema(example = "https://m.media-amazon.com/images/M/MV5BN2Y2MTljNjMtMDRlNi00ZWNhLThmMWItYTlmZjYyZDk4NzYxXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg") String poster) {
}