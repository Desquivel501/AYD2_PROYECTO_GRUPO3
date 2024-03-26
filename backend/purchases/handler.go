package purchases

import (
	// "encoding/json"
	// "io/ioutil"
	"encoding/json"
	"net/http"
	"strconv"
)

func PurchaseHandler(w http.ResponseWriter, r *http.Request){
	var purchase purchase
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&purchase)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	result, err := CreatePurchase(purchase)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func UserPurchasesHandler(w http.ResponseWriter, r *http.Request){
	dpi_str := r.URL.Query().Get("dpi")
	if dpi_str == "" {
		http.Error(w, "Parámetro 'dpi' no encontrado en la URL /product", http.StatusBadRequest)
		return
	}

	dpi, err := strconv.ParseInt(dpi_str, 10, 64)
	if err != nil {
		http.Error(w, "Parámetro 'id' no es un valor válido en de un vendedor", http.StatusBadRequest)
		return
	}

	result, err := GetClientPurchases(dpi)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func SellerSalesHandler(w http.ResponseWriter, r *http.Request){
	dpi_str := r.URL.Query().Get("dpi")
	if dpi_str == "" {
		http.Error(w, "Parámetro 'dpi' no encontrado en la URL /product", http.StatusBadRequest)
		return
	}

	dpi, err := strconv.ParseInt(dpi_str, 10, 64)
	if err != nil {
		http.Error(w, "Parámetro 'id' no es un valor válido en de un vendedor", http.StatusBadRequest)
		return
	}

	result, err := GetSellerSales(dpi)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}