package purchases

import (
	// "encoding/json"
	// "io/ioutil"
	"encoding/json"
	"fmt"
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
	logs.AddToHistory(purchase.Client_id, "Realizar compra", fmt.Sprintf("El usuario %d realiza compra", purchase.Client_id))
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
	logs.AddToHistory(dpi, "Compras realizadas", fmt.Sprintf("Se obtiene todas las comprsa realiadas por el usuario %s", dpi_str))
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
	logs.AddToHistory(dpi, "Obtener ventas", fmt.Sprintf("Se obtiene ventas del vendedor %s", dpi_str))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}


func GetAllPurchasesHandler(w http.ResponseWriter, r *http.Request) {
	result, err := GetAllPurchases()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent("Se realiza compra de producto")
	logs.AddToHistory(0, "Compras realizadas", fmt.Sprintf("Se obtiene el historial de todas las compras que se han hecho %s", "Listado de todas las compras"))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}