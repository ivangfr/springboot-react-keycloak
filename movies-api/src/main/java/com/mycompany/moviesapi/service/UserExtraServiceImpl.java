package com.mycompany.moviesapi.service;

import com.mycompany.moviesapi.exception.UserExtraNotFoundException;
import com.mycompany.moviesapi.model.UserExtra;
import com.mycompany.moviesapi.repository.UserExtraRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserExtraServiceImpl implements UserExtraService {

    private final UserExtraRepository userExtraRepository;

    public UserExtraServiceImpl(UserExtraRepository userExtraRepository) {
        this.userExtraRepository = userExtraRepository;
    }

    @Override
    public UserExtra validateAndGetUserExtra(String username) {
        return getUserExtra(username).orElseThrow(() -> new UserExtraNotFoundException(String.format("UserExtra of %s not found", username)));
    }

    @Override
    public Optional<UserExtra> getUserExtra(String username) {
        return userExtraRepository.findById(username);
    }

    @Override
    public UserExtra saveUserExtra(UserExtra userExtra) {
        return userExtraRepository.save(userExtra);
    }

}
