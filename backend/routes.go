package main

import (
	categoryfilter "main/categoryFilter"
	productos "main/products"
	"main/root"
	users "main/users"
	"net/http"
)

func Routes(mux *http.ServeMux) {
	mux.HandleFunc("/", root.RootHandler)
	mux.HandleFunc("/category_filter", categoryfilter.CategoryFilterHandler)
	//Handlers de usuarios
	mux.HandleFunc("/user/login", users.LoginHandler)
	mux.HandleFunc("/user/register", users.RegisterHandler)
	//Handlers de productos
	mux.HandleFunc("/all-products", productos.GetAllProductsHandler)
	mux.HandleFunc("/product", productos.GetProductHandler)
}
