package com.mycompany.moviesapi.rest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

  @GetMapping(path = "/hotwire")
  public String home(Model model) {
    return "home";
  }
}
