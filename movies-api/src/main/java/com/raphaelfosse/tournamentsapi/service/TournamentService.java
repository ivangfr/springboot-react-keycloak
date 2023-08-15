package com.ivanfranchin.tournamentsapi.service;

import com.ivanfranchin.tournamentsapi.model.Tournament;

import java.util.List;

public interface TournamentService {

    Tournament validateAndGetTournament(String Id);

    List<Tournament> getTournaments();

    Tournament saveTournament(Tournament tournament);

    void deleteTournament(Tournament tournament);
}