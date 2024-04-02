package categoryfilter

import (
	"encoding/json"
	"main/logs"
	"net/http"
)

func GetAllCategoriesHandler(w http.ResponseWriter, r *http.Request) {
	products, err := GetAllCategories()
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	} else {
		logs.AddLogEvent("Se obtuvo una lista de categorias")
	}

	// Convierte el slice de Product a JSON y escribe la respuesta HTTP
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}
