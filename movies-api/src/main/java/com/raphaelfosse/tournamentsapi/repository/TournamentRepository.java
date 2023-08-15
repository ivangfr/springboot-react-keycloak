package com.ivanfranchin.tournamentsapi.repository;

import com.ivanfranchin.tournamentsapi.model.Tournament;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TournamentRepository extends MongoRepository<Tournament, String> {
}