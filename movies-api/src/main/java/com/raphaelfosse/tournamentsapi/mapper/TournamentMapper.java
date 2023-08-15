package com.ivanfranchin.tournamentsapi.mapper;

import com.ivanfranchin.tournamentsapi.model.Tournament;
import com.ivanfranchin.tournamentsapi.rest.dto.CreateTournamentRequest;
import com.ivanfranchin.tournamentsapi.rest.dto.TournamentDto;
import com.ivanfranchin.tournamentsapi.rest.dto.UpdateTournamentRequest;
import com.ivanfranchin.tournamentsapi.service.UserExtraService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = UserExtraService.class
)
public abstract class TournamentMapper {

    @Autowired
    protected UserExtraService userExtraService;

    @Mapping(target = "comments", ignore = true)
    public abstract Tournament toTournament(CreateTournamentRequest createTournamentRequest);

    @Mapping(target = "imdbId", ignore = true)
    @Mapping(target = "comments", ignore = true)
    public abstract void updateTournamentFromDto(UpdateTournamentRequest updateTournamentRequest, @MappingTarget Tournament tournament);

    public abstract TournamentDto toTournamentDto(Tournament tournament);

    @Mapping(
            target = "avatar",
            expression = "java( userExtraService.getUserExtra(comment.getUsername()).isPresent() ? userExtraService.getUserExtra(comment.getUsername()).get().getAvatar() : comment.getUsername() )"
    )
    public abstract TournamentDto.CommentDto toTournamentDtoCommentDto(Tournament.Comment comment);
}