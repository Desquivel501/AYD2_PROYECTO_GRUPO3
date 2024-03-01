package product

import (
	"encoding/json"
	"net/http"
	"strconv"
)

func GetAllProductsHandler(w http.ResponseWriter, r *http.Request) {
	products, err := GetAllProducts()
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Convierte el slice de Product a JSON y escribe la respuesta HTTP
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func GetProductHandler(w http.ResponseWriter, r *http.Request) {
	// Obtiene el valor del parámetro "id" de la URL
	id_str := r.URL.Query().Get("id")
	// Verifica si el parámetro "id" está presente en la URL
	if id_str == "" {
		http.Error(w, "Parámetro 'id' no encontrado en la URL /product", http.StatusBadRequest)
		return
	}
	//Convierte el id del producto en un valor entero
	id, err := strconv.Atoi(id_str)
	if err != nil {
		http.Error(w, "Parámetro 'id' no es un valor válido en /product", http.StatusBadRequest)
		return
	}

	product, err := GetProduct(id)
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Convierte el slice de Product a JSON y escribe la respuesta HTTP
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(product)
}

func GetSellerProductsHandler(w http.ResponseWriter, r *http.Request) {
	// Obtiene el valor del parámetro "id" de la URL
	id_str := r.URL.Query().Get("id")
	// Verifica si el parámetro "id" está presente en la URL
	if id_str == "" {
		http.Error(w, "Parámetro 'id' no encontrado en la URL /product", http.StatusBadRequest)
		return
	}
	//Convierte el id del vendedor en un valor entero
	id, err := strconv.Atoi(id_str)
	if err != nil {
		http.Error(w, "Parámetro 'id' no es un valor válido en de un vendedor", http.StatusBadRequest)
		return
	}

	products, err := GetSellerProducts(id)
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Convierte el slice de Product a JSON y escribe la respuesta HTTP
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

// Manejador del método actualizar producto
func UpdateProductHandler(w http.ResponseWriter, r *http.Request) {
	// Decodifica el JSON del cuerpo de la solicitud en un objeto UpdateProduct
	var product UpdateProductStruct

	err := json.NewDecoder(r.Body).Decode(&product)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	status, err := UpdateProduct(product)
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Convierte el statusResponse a JSON y escribe la respuesta HTTP
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(status)
}

// Manejador del método eliminar producto
func DeleteProductHandler(w http.ResponseWriter, r *http.Request) {
	// Obtiene el valor del parámetro "id" de la URL
	id_str := r.URL.Query().Get("id")
	// Verifica si el parámetro "id" está presente en la URL
	if id_str == "" {
		http.Error(w, "Parámetro 'id' no encontrado en la URL /product", http.StatusBadRequest)
		return
	}
	//Convierte el id del producto en un valor entero
	id, err := strconv.Atoi(id_str)
	if err != nil {
		http.Error(w, "Parámetro 'id' no es un valor válido en /delete-product", http.StatusBadRequest)
		return
	}

	status, err := DeleteProduct(id)
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Convierte el resultado a JSON y escribe la respuesta HTTP
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(status)
}
