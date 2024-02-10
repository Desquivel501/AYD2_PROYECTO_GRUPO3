package main

import (
	categoryfilter "main/categoryFilter"
	"main/root"
	"net/http"
)

func Routes(mux *http.ServeMux) {
	mux.HandleFunc("/", root.RootHandler)
	mux.HandleFunc("/category_filter", categoryfilter.CategoryFilterHandler)
}
