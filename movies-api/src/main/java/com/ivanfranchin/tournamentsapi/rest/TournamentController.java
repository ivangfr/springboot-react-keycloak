package com.ivanfranchin.tournamentsapi.rest;

import com.ivanfranchin.tournamentsapi.mapper.TournamentMapper;
import com.ivanfranchin.tournamentsapi.model.Tournament;
import com.ivanfranchin.tournamentsapi.rest.dto.AddCommentRequest;
import com.ivanfranchin.tournamentsapi.rest.dto.CreateTournamentRequest;
import com.ivanfranchin.tournamentsapi.rest.dto.TournamentDto;
import com.ivanfranchin.tournamentsapi.rest.dto.UpdateTournamentRequest;
import com.ivanfranchin.tournamentsapi.service.TournamentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import static com.ivanfranchin.tournamentsapi.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {

    private final TournamentService tournamentService;
    private final TournamentMapper tournamentMapper;

    @GetMapping
    public List<TournamentDto> getTournaments() {
        return tournamentService.getTournaments().stream().map(tournamentMapper::toTournamentDto).toList();
    }

    @GetMapping("/{Id}")
    public TournamentDto getTournament(@PathVariable String Id) {
        Tournament tournament = tournamentService.validateAndGetTournament(Id);
        return tournamentMapper.toTournamentDto(tournament);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public TournamentDto createTournament(@Valid @RequestBody CreateTournamentRequest createTournamentRequest) {
        Tournament tournament = tournamentMapper.toTournament(createTournamentRequest);
        tournament = tournamentService.saveTournament(tournament);
        return tournamentMapper.toTournamentDto(tournament);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PutMapping("/{id}")
    public TournamentDto updateTournament(@PathVariable String id, @Valid @RequestBody UpdateTournamentRequest updateTournamentRequest) {
        Tournament tournament = tournamentService.validateAndGetTournament(id);
        tournamentMapper.updateTournamentFromDto(updateTournamentRequest, tournament);
        tournament = tournamentService.saveTournament(tournament);
        return tournamentMapper.toTournamentDto(tournament);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public TournamentDto deleteTournament(@PathVariable String id) {
        Tournament tournament = tournamentService.validateAndGetTournament(id);
        tournamentService.deleteTournament(tournament);
        return tournamentMapper.toTournamentDto(tournament);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{id}/comments")
    public TournamentDto addTournamentComment(@PathVariable String id,
                                              @Valid @RequestBody AddCommentRequest addCommentRequest,
                                              Principal principal) {
        Tournament tournament = tournamentService.validateAndGetTournament(id);
        Tournament.Comment comment = new Tournament.Comment(principal.getName(), addCommentRequest.getText(), LocalDateTime.now());
        tournament.getComments().add(0, comment);
        tournament = tournamentService.saveTournament(tournament);
        return tournamentMapper.toTournamentDto(tournament);
    }
}