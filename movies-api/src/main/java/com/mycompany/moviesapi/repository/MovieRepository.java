package com.mycompany.moviesapi.repository;

import com.mycompany.moviesapi.model.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MovieRepository extends MongoRepository<Movie, String> {
}