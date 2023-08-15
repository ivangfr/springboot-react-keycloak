package com.ivanfranchin.tournamentsapi.service;

import com.ivanfranchin.tournamentsapi.model.UserExtra;

import java.util.Optional;

public interface UserExtraService {

    UserExtra validateAndGetUserExtra(String username);

    Optional<UserExtra> getUserExtra(String username);

    UserExtra saveUserExtra(UserExtra userExtra);
}
