package com.ivanfranchin.moviesapi.userextra.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "userextras")
class UserExtra(
    @Id
    val username: String
) {
    var avatar: String? = null
}

/*

data class UserExtra(
    @Id
    val username: String,
    var avatar: String? = null
)

val username: vì bạn chỉ set giá trị này qua
constructor nên để val là hợp lý (immutable).

var avatar: String? = null: biến avatar là var vì
có thể thay đổi, và nullable (String?) vì ban đầu chưa có
giá trị (giống như Java khi bạn không set avatar trong constructor).

*/