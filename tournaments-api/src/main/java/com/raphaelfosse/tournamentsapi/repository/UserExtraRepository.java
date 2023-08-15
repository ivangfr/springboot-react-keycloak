package com.raphaelfosse.tournamentsapi.repository;

import com.raphaelfosse.tournamentsapi.model.UserExtra;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserExtraRepository extends MongoRepository<UserExtra, String> {
}
