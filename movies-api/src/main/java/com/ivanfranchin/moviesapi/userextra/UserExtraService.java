package com.ivanfranchin.moviesapi.userextra;

import com.ivanfranchin.moviesapi.userextra.model.UserExtra;

import java.util.Optional;

public interface UserExtraService {

    UserExtra validateAndGetUserExtra(String username);

    Optional<UserExtra> getUserExtra(String username);

    UserExtra saveUserExtra(UserExtra userExtra);
}
