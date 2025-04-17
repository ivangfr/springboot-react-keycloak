package com.ivanfranchin.moviesapi

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import java.awt.Desktop
import java.net.URI
import java.util.*
@SpringBootApplication
class MoviesApiApplication

fun main(args: Array<String>) {
    runApplication<MoviesApiApplication>(*args)
    openHomePage("http://localhost:9080/swagger-ui.html")
}

fun openHomePage(urls: Any) {
    try {
        val urlList = when (urls) {
            is List<*> -> urls.filterIsInstance<String>() // Handles if it's a List<String>
            is String -> listOf(urls) // Converts a single URL to a list
            else -> throw IllegalArgumentException("Invalid argument type")
        }

        val desktop = if (Desktop.isDesktopSupported()) Desktop.getDesktop() else null
        val os = System.getProperty("os.name").lowercase(Locale.getDefault())

        for (url in urlList) {
            if (desktop != null && desktop.isSupported(Desktop.Action.BROWSE)) {
                desktop.browse(URI.create(url))
            } else {
                when {
                    os.contains("win") -> Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler $url")
                    os.contains("mac") -> Runtime.getRuntime().exec("open $url")
                    os.contains("nix") || os.contains("nux") -> Runtime.getRuntime().exec("xdg-open $url")
                    else -> println("Unsupported operating system: $os")
                }
            }
        }
    } catch (e: Exception) {
        e.printStackTrace()
    }
}