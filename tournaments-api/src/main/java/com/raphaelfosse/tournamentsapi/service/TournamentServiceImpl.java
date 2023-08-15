package com.raphaelfosse.tournamentsapi.service;

import com.raphaelfosse.tournamentsapi.exception.TournamentNotFoundException;
import com.raphaelfosse.tournamentsapi.model.Tournament;
import com.raphaelfosse.tournamentsapi.repository.TournamentRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TournamentServiceImpl implements TournamentService {

    private final TournamentRepository tournamentRepository;

    @Override
    public Tournament validateAndGetTournament(String imdbId) {
        return tournamentRepository.findById(imdbId).orElseThrow(() -> new TournamentNotFoundException(imdbId));
    }

    @Override
    public List<Tournament> getTournaments() {
        return tournamentRepository.findAll();
    }

    @Override
    public Tournament saveTournament(Tournament tournament) {
        return tournamentRepository.save(tournament);
    }

    @Override
    public void deleteTournament(Tournament tournament) {
        tournamentRepository.delete(tournament);
    }
}