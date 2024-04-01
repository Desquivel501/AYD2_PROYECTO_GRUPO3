package reports

import (
	"encoding/json"
	"fmt"
	"main/logs"
	"net/http"
	"strconv"
)

// Manejador de reporte Obtener los productos más vendidos
func GetMostSelledProductsHandler(w http.ResponseWriter, r *http.Request) {
	entries, err := GetMostSelledProducts()
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	logs.AddLogEvent("Se obtiene reporte de los productos más vendidos")
	logs.AddToHistory(0, "Generar reporte", "Se genera reporte de mejor producto")
	// Convierte el slice de MostSelledProductEntry a JSON y escribe la respuesta HTTP
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(entries)
}

// Manejador de reporte Obtener mejores vendedores
func GetBestSellerHandler(w http.ResponseWriter, r *http.Request) {
	entries, err := GetBestSeller()
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	logs.AddLogEvent("Se obtiene reporte de mejores vendedores")
	logs.AddToHistory(0, "Generar reporte", "Se genera reporte mejores vendedores")
	// Convierte el slice de BestSellerEntry a JSON y escribe la respuesta HTTP
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(entries)
}

// Manejador de reporte obtener la categoria mas vendida
func GetMostSelledCategoryHandler(w http.ResponseWriter, r *http.Request) {
	entries, err := GetMostSelledCategory()
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	logs.AddLogEvent("Se obtiene reporte de categoria más vendida")
	logs.AddToHistory(0, "Generar reporte", "Se genera reporte de categoria más vendida")
	// Convierte el slice de MostSelledCategoryEntry a JSON y escribe la respuesta HTTP
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(entries)
}

// Manejador de reporte obtener los productos más vendidos de un vendedor en especifico
func GetMostSelledSProductsHandler(w http.ResponseWriter, r *http.Request) {
	// Obtiene el valor del parámetro "dpi" de la URL
	dpi_str := r.URL.Query().Get("dpi")
	// Verifica si el parámetro "dpi" está presente en la URL
	if dpi_str == "" {
		http.Error(w, "Parámetro 'dpi' no encontrado en la URL /vendedor/reporte/productos", http.StatusBadRequest)
		logs.AddLogEvent("Error al obtener reporte mejor producto de vendedor: Parámetro 'dpi' no encontrado en la URL /vendedor/reporte/productos")
		return
	}
	//Convierte el dpi del vendedor en un valor entero
	dpi, err := strconv.Atoi(dpi_str)
	if err != nil {
		http.Error(w, "Parámetro 'dpi' no es un valor válido de un vendedor", http.StatusBadRequest)
		logs.AddLogEvent("Error al obtener producto: Parámetro 'dpi' no es un valor válido de un vendedor")
		return
	}

	entries, err := GetMostSelledSProducts(dpi)
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	logs.AddLogEvent(fmt.Sprintf("Se obtiene lista de producto del vendedor con ID=%s", dpi_str))
	logs.AddToHistory(0, "Generar reporte", "Se genera reporte de productos más vendidos por vendedor")
	// Convierte el slice de Product a JSON y escribe la respuesta HTTP
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(entries)
}

// Manejador de reporte obtener la categoria mas vendida de un vendedor en especifico
func GetMostSelledSCategoryHandler(w http.ResponseWriter, r *http.Request) {
	// Obtiene el valor del parámetro "dpi" de la URL
	dpi_str := r.URL.Query().Get("dpi")
	// Verifica si el parámetro "dpi" está presente en la URL
	if dpi_str == "" {
		http.Error(w, "Parámetro 'dpi' no encontrado en la URL /vendedor/reporte/categoria", http.StatusBadRequest)
		logs.AddLogEvent("Error al obtener reporte de categorias por DPI: Parámetro 'dpi' no encontrado en la URL /my-products")
		return
	}
	//Convierte el dpi del vendedor en un valor entero
	dpi, err := strconv.Atoi(dpi_str)
	if err != nil {
		http.Error(w, "Parámetro 'dpi' no es un valor válido de un vendedor", http.StatusBadRequest)
		logs.AddLogEvent("Error al obtener producto: Parámetro 'dpi' no es un valor válido de un vendedor")
		return
	}

	entries, err := GetMostSelledSCategory(dpi)
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	logs.AddLogEvent(fmt.Sprintf("Se obtiene lista de producto del vendedor con ID=%s", dpi_str))
	logs.AddToHistory(0, "Generar reporte", "Se genera reporte de listar categorías más vendida por vendedor")
	// Convierte el slice de Product a JSON y escribe la respuesta HTTP
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(entries)
}
