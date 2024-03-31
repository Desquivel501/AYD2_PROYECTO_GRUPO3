package main

import (
	categoryfilter "main/CateroryFilter"
	logs "main/logs"
	productos "main/products"
	"main/purchases"
	"main/root"
	users "main/users"
	"net/http"
)

func Routes(mux *http.ServeMux) {
	mux.HandleFunc("/", root.RootHandler)
	//Handlers de usuarios
	mux.HandleFunc("/user/login", users.LoginHandler)
	mux.HandleFunc("/user/register", users.RegisterHandler)
	mux.HandleFunc("/user/profile", users.ProfileHandler)
	mux.HandleFunc("/user/update-profile", users.UpdateProfileHandler)
	mux.HandleFunc("/user/accept-seller", users.AcceptSellerHandler)
	mux.HandleFunc("/user/decline-seller", users.DeclineSellerHandler)
	mux.HandleFunc("/pending-sellers", users.PendingSellersHandler)
	mux.HandleFunc("/user/disable-user", users.DisableUserHandler)
	mux.HandleFunc("/user/enable-user", users.EnableUserHandler)
	mux.HandleFunc("/all-users", users.AllUsersHandler)
	mux.HandleFunc("/disabled-users", users.DisabledUsersHandler)
	mux.HandleFunc("/enabled-users", users.EnabledUsersHandler)
	mux.HandleFunc("/user/add-payment-method", users.CreatePaymentMethodHandler)
	mux.HandleFunc("/user/get-payment-methods", users.GetPaymentMethodsHandler)
	//Handlers de compras
	mux.HandleFunc("/user/purchase", purchases.PurchaseHandler)
	mux.HandleFunc("/user/purchases", purchases.UserPurchasesHandler)
	mux.HandleFunc("/user/sales", purchases.SellerSalesHandler)
	//Handlers de productos
	mux.HandleFunc("/all-products", productos.GetAllProductsHandler)
	mux.HandleFunc("/product", productos.GetProductHandler)
	mux.HandleFunc("/my-products", productos.GetSellerProductsHandler)
	mux.HandleFunc("/edit-product", productos.UpdateProductHandler)
	mux.HandleFunc("/delete-product", productos.DeleteProductHandler)
	mux.HandleFunc("/create-product", productos.CreateProductHandler)
	//Handler de categorias
	mux.HandleFunc("/categories", categoryfilter.GetAllCategoriesHandler)

	//Change Password
	mux.HandleFunc("/user/generate-code", users.GenerateCodeHandler)
	mux.HandleFunc("/user/validate-code", users.ValidateCodeHandler)
	mux.HandleFunc("/user/change-password", users.ChangePasswordHandler)

	//Handler de logs
	mux.HandleFunc("/logs/download", logs.DownloadLogFileHandler)

	//Handler de bitácora
	mux.HandleFunc("/bitacora", logs.GetBitacoraHandler)
}
