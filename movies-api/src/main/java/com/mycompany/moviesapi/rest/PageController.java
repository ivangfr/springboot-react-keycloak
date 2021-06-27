package com.mycompany.moviesapi.rest;

import com.mycompany.moviesapi.mapper.MovieMapper;
import com.mycompany.moviesapi.rest.dto.MovieDto;
import com.mycompany.moviesapi.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Controller
public class PageController {

  private final MovieService movieService;
  private final MovieMapper movieMapper;

  @GetMapping(path = "/hotwire")
  public String home(Model model) {
    List<MovieDto> movies = movieService.getMovies().stream()
            .map(movieMapper::toMovieDto)
            .collect(Collectors.toList());
    model.addAttribute("movies", movies);
    return "home";
  }
}
