package com.mycompany.moviesapi.mapper;

import java.util.Optional;

import com.mycompany.moviesapi.model.Movie;
import com.mycompany.moviesapi.model.UserExtra;
import com.mycompany.moviesapi.rest.dto.CreateMovieRequest;
import com.mycompany.moviesapi.rest.dto.MovieDto;
import com.mycompany.moviesapi.rest.dto.UpdateMovieRequest;
import com.mycompany.moviesapi.service.UserExtraService;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = {UserExtraService.class}
)
public abstract class MovieMapper {

  @Autowired
  private UserExtraService userExtraService;
  
  public abstract Movie toMovie(CreateMovieRequest createMovieRequest);

  public abstract void updateMovieFromDto(UpdateMovieRequest updateMovieRequest, @MappingTarget Movie movie);

  public abstract MovieDto toMovieDto(Movie movie);

  public MovieDto.CommentDto toMovieDtoCommentDto(Movie.Comment comment) {
    MovieDto.CommentDto commentDto = new MovieDto.CommentDto();
    commentDto.setUsername(comment.getUsername());
    commentDto.setText(comment.getText());
    commentDto.setTimestamp(comment.getTimestamp());
    
    Optional<UserExtra> userExtra = userExtraService.getUserExtra(comment.getUsername());
    commentDto.setAvatar(userExtra.isPresent() ? userExtra.get().getAvatar() : comment.getUsername());
    return commentDto;
  }

}