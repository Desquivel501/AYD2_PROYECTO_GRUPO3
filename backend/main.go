package main

import (
	"log"
	// "main/cors"
	"github.com/rs/cors"
	"net/http"
	"main/database"
)

// go get github.com/rs/cors

func main() {
	mux := http.NewServeMux()

	Routes(mux)

	// handler := cors.CorsMiddleware(mux)
	defer database.Connection.Close()
	handler := cors.Default().Handler(mux)
	log.Fatal(http.ListenAndServe(":8080", handler))
}
