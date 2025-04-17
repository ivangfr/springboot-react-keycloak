package com.ivanfranchin.moviesapi.userextra.dto

import io.swagger.v3.oas.annotations.media.Schema

class MovieDTO {

    data class UpdateMovieRequest(
        @Schema(example = "Resident Evil: Apocalypse") val title: String,
        @Schema(
            example = "Paul W.S. Anderson",
            description = "Set \"N/A\" if the director of the movie is unknown"
        ) val director: String,
        @Schema(
            example = "2004",
            description = "Set \"N/A\" if the year of the movie is unknown"
        ) val year: String,
        @Schema(example = "https://m.media-amazon.com/images/M/MV5BMTc1NTUxMzk0Nl5BMl5BanBnXkFtZTcwNDQ1MDIzMw@@._V1_SX300.jpg") val poster: String
    )


}