package com.ivanfranchin.moviesapi.movie;

import com.ivanfranchin.moviesapi.movie.model.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends MongoRepository<Movie, String> {
}