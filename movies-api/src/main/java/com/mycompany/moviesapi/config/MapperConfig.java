package com.mycompany.moviesapi.config;

import com.mycompany.moviesapi.model.Movie;
import com.mycompany.moviesapi.model.UserExtra;
import com.mycompany.moviesapi.rest.dto.MovieDto;
import com.mycompany.moviesapi.service.UserExtraService;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MapperFacade;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.impl.DefaultMapperFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
@Configuration
public class MapperConfig {

    private final UserExtraService userExtraService;

    @Bean
    MapperFactory mapperFactory() {
        DefaultMapperFactory mapperFactory = new DefaultMapperFactory.Builder().useAutoMapping(true).mapNulls(false).build();

        mapperFactory.classMap(Movie.Comment.class, MovieDto.CommentDto.class).byDefault()
                .customize(new CustomMapper<Movie.Comment, MovieDto.CommentDto>() {
                    @Override
                    public void mapAtoB(Movie.Comment comment, MovieDto.CommentDto commentDto, MappingContext context) {
                        super.mapAtoB(comment, commentDto, context);
                        Optional<UserExtra> userExtra = userExtraService.getUserExtra(comment.getUsername());
                        commentDto.setAvatar(userExtra.isPresent() ? userExtra.get().getAvatar() : comment.getUsername());
                    }
                }).register();

        return mapperFactory;
    }

    @Bean
    MapperFacade mapperFacade() {
        return mapperFactory().getMapperFacade();
    }
}