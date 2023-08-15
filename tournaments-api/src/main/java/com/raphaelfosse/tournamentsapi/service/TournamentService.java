package com.raphaelfosse.tournamentsapi.service;

import com.raphaelfosse.tournamentsapi.model.Tournament;

import java.util.List;

public interface TournamentService {

    Tournament validateAndGetTournament(String Id);

    List<Tournament> getTournaments();

    Tournament saveTournament(Tournament tournament);

    void deleteTournament(Tournament tournament);
}