package com.raphaelfosse.tournamentsapi.repository;

import com.raphaelfosse.tournamentsapi.model.Tournament;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TournamentRepository extends MongoRepository<Tournament, String> {
}