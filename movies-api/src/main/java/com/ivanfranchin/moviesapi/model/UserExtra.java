package com.ivanfranchin.moviesapi.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "userextras")
public class UserExtra {

    @Id
    private String username;
    private String avatar;

    public UserExtra(String username) {
        this.username = username;
    }
}
