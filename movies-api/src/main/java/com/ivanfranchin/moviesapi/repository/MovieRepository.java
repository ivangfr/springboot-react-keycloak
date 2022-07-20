package com.ivanfranchin.moviesapi.repository;

import com.ivanfranchin.moviesapi.model.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends MongoRepository<Movie, String> {
}