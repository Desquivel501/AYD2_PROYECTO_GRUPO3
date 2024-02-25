package main

import (
	categoryfilter "main/categoryFilter"
	productos "main/products"
	"main/root"
	"net/http"
)

func Routes(mux *http.ServeMux) {
	mux.HandleFunc("/", root.RootHandler)
	mux.HandleFunc("/category_filter", categoryfilter.CategoryFilterHandler)
	//Handlers de productos
	mux.HandleFunc("/all-products", productos.GetAllProductsHandler)
	mux.HandleFunc("/product", productos.GetProductHandler)
}
