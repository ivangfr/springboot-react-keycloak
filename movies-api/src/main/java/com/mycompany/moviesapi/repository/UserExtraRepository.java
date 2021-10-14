package com.mycompany.moviesapi.repository;

import com.mycompany.moviesapi.model.UserExtra;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserExtraRepository extends MongoRepository<UserExtra, String> {
}
