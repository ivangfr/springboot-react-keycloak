package com.ivanfranchin.moviesapi.repository;

import com.ivanfranchin.moviesapi.model.UserExtra;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserExtraRepository extends MongoRepository<UserExtra, String> {
}
