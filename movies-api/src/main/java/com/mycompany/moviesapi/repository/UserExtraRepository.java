package com.mycompany.moviesapi.repository;

import com.mycompany.moviesapi.model.UserExtra;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserExtraRepository extends MongoRepository<UserExtra, String> {
}
