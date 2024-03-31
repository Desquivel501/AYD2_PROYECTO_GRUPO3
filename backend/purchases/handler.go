package purchases

import (
	// "encoding/json"
	// "io/ioutil"
	"encoding/json"
	"main/logs"
	"net/http"
	"strconv"
)

func PurchaseHandler(w http.ResponseWriter, r *http.Request) {
	var purchase Purchase
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&purchase)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := CreatePurchase(purchase)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent("Se crea compra de producto")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func UserPurchasesHandler(w http.ResponseWriter, r *http.Request) {
	dpi_str := r.URL.Query().Get("dpi")
	if dpi_str == "" {
		http.Error(w, "Parámetro 'dpi' no encontrado en la URL /user/purchases", http.StatusBadRequest)
		logs.AddLogEvent("Parámetro 'dpi' no encontrado en la URL /user/purchases")
		return
	}

	dpi, err := strconv.ParseInt(dpi_str, 10, 64)
	if err != nil {
		http.Error(w, "Parámetro 'id' no es un valor válido en de un vendedor", http.StatusBadRequest)
		logs.AddLogEvent("Parámetro 'id' no es un valor válido en de un vendedor")
		return
	}

	result, err := GetClientPurchases(dpi)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent("Se realiza compra de producto")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func SellerSalesHandler(w http.ResponseWriter, r *http.Request) {
	dpi_str := r.URL.Query().Get("dpi")
	if dpi_str == "" {
		http.Error(w, "Parámetro 'dpi' no encontrado en la URL /user/sales", http.StatusBadRequest)
		logs.AddLogEvent("Parámetro 'dpi' no encontrado en la URL /user/sales")
		return
	}

	dpi, err := strconv.ParseInt(dpi_str, 10, 64)
	if err != nil {
		http.Error(w, "Parámetro 'id' no es un valor válido en de un vendedor", http.StatusBadRequest)
		logs.AddLogEvent("Parámetro 'id' no es un valor válido en de un vendedor")
		return
	}

	result, err := GetSellerSales(dpi)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent("Se obtiene ventas del vendedor")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}
