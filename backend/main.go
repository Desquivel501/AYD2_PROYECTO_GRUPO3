package main

import (
	"log"
	"main/Cors"
	"net/http"
)

func main() {
	mux := http.NewServeMux()

	Routes(mux)

	handler := Cors.CorsMiddleware(mux)
	log.Fatal(http.ListenAndServe(":8080", handler))
}
