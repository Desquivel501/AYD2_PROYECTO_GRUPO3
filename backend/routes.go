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
	mux.HandleFunc("/user/profile", users.ProfileHandler)
	mux.HandleFunc("/user/update-profile", users.UpdateProfileHandler)
	mux.HandleFunc("/user/accept-seller", users.AcceptSellerHandler)
	mux.HandleFunc("/user/disable-user", users.DisableUserHandler)
	mux.HandleFunc("/user/enable-user", users.EnableUserHandler)
	mux.HandleFunc("/all-users", users.AllUsersHandler)
	mux.HandleFunc("/disabled-users", users.DisabledUsersHandler)
	mux.HandleFunc("/enabled-users", users.EnabledUsersHandler)
	//Handlers de productos
	mux.HandleFunc("/all-products", productos.GetAllProductsHandler)
	mux.HandleFunc("/product", productos.GetProductHandler)
	mux.HandleFunc("/my-products", productos.GetSellerProductsHandler)
	mux.HandleFunc("/edit-product", productos.UpdateProductHandler)
	mux.HandleFunc("/delete-product", productos.DeleteProductHandler)

}
