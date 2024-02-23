package product

import (
	"encoding/json"
	"net/http"
)

func GetAllProductsHandler(w http.ResponseWriter, r *http.Request) {
	err, products := GetAllProducts()
	//Si encuentra un error
	if len(err) > 0 {
		http.Error(w, err, http.StatusInternalServerError)
		return
	}

	// Convierte el slice de Product a JSON y escribe la respuesta HTTP
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}
