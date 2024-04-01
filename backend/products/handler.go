package products

import (
	"encoding/json"
	"fmt"
	"main/logs"
	"net/http"
	"strconv"
)

func GetAllProductsHandler(w http.ResponseWriter, r *http.Request) {
	products, err := GetAllProducts()
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	logs.AddLogEvent("Se obtiene una lista lista de productos")
	logs.AddToHistory(0, "Obtener productos", "Se obtiene todos los productos")

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
		logs.AddLogEvent("Error al obtener producto: Parámetro 'id' no encontrado en la URL /product")
		return
	}
	//Convierte el id del producto en un valor entero
	id, err := strconv.Atoi(id_str)
	if err != nil {
		http.Error(w, "Parámetro 'id' no es un valor válido en /product", http.StatusBadRequest)
		logs.AddLogEvent("Error al obtener producto: Parámetro 'id' no es un valor válido en /product")
		return
	}

	product, err := GetProduct(id)
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	logs.AddLogEvent(fmt.Sprintf("Se obtiene producto con ID=%s", id_str))
	logs.AddToHistory(0, "Obtener producto", fmt.Sprintf("Se obtiene producto %s", product.Nombre))
	// Convierte el slice de Product a JSON y escribe la respuesta HTTP
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(product)
}

func GetSellerProductsHandler(w http.ResponseWriter, r *http.Request) {
	// Obtiene el valor del parámetro "id" de la URL
	id_str := r.URL.Query().Get("id")
	// Verifica si el parámetro "id" está presente en la URL
	if id_str == "" {
		http.Error(w, "Parámetro 'id' no encontrado en la URL /my-products", http.StatusBadRequest)
		logs.AddLogEvent("Error al obtener producto: Parámetro 'id' no encontrado en la URL /my-products")
		return
	}
	//Convierte el id del vendedor en un valor entero
	id, err := strconv.Atoi(id_str)
	if err != nil {
		http.Error(w, "Parámetro 'id' no es un valor válido de un vendedor", http.StatusBadRequest)
		logs.AddLogEvent("Error al obtener producto: Parámetro 'id' no es un valor válido de un vendedor")
		return
	}

	products, err := GetSellerProducts(id)
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	logs.AddLogEvent(fmt.Sprintf("Se obtiene lista de producto del vendedor con ID=%s", id_str))
	logs.AddToHistory(id, "Obtener productos", "Se obtiene todos los productos")
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
		logs.AddLogEvent(err.Error())
		return
	}

	status, err := UpdateProduct(product)
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent(fmt.Sprintf("Se actualiza producto con ID=%d", product.ProductID))
	logs.AddToHistory(int(product.SellerDPI), "Actualización de producto", fmt.Sprintf("Se actualiza el producto con ID %d", product.ProductID))
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
		http.Error(w, "Parámetro 'id' no encontrado en la URL /delete-product", http.StatusBadRequest)
		logs.AddLogEvent("Parámetro 'id' no encontrado en la URL /delete-product")
		return
	}
	//Convierte el id del producto en un valor entero
	id, err := strconv.Atoi(id_str)
	if err != nil {
		http.Error(w, "Parámetro 'id' no es un valor válido en /delete-product", http.StatusBadRequest)
		logs.AddLogEvent("Parámetro 'id' no es un valor válido en /delete-product")
		return
	}

	status, err := DeleteProduct(id)
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	logs.AddLogEvent(fmt.Sprintf("Se elimina producto con ID=%s", id_str))
	logs.AddToHistory(0, "Eliminar producto", fmt.Sprintf("Se elimina el producto con ID %s", id_str))
	// Convierte el resultado a JSON y escribe la respuesta HTTP
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(status)
}

// Manejador del método Creat producto
func CreateProductHandler(w http.ResponseWriter, r *http.Request) {
	var producto Product

	err := json.NewDecoder(r.Body).Decode(&producto)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		logs.AddLogEvent(err.Error())
		return
	}

	status, err := CreateProduct(producto)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	logs.AddLogEvent(fmt.Sprintf("Se agrega producto con ID=%d", producto.ProductID))
	logs.AddToHistory(producto.Vendedor, "Crear producto", fmt.Sprintf("Se crea el producto con ID %d", producto.ProductID))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(status)
}
