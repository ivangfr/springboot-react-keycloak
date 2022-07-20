package com.ivanfranchin.moviesapi.service;

import com.ivanfranchin.moviesapi.model.UserExtra;

import java.util.Optional;

public interface UserExtraService {

    UserExtra validateAndGetUserExtra(String username);

    Optional<UserExtra> getUserExtra(String username);

    UserExtra saveUserExtra(UserExtra userExtra);
}
