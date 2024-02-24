package main

import (
	"log"
	"main/cors"
	"net/http"
)

func main() {
	mux := http.NewServeMux()

	Routes(mux)

	handler := cors.CorsMiddleware(mux)
	log.Fatal(http.ListenAndServe(":8080", handler))
}
