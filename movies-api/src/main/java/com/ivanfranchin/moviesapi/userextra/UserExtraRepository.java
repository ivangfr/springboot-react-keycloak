package com.ivanfranchin.moviesapi.userextra;

import com.ivanfranchin.moviesapi.userextra.model.UserExtra;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserExtraRepository extends MongoRepository<UserExtra, String> {
}
