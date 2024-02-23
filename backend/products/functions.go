package product

import (
	"fmt"
	"main/database"
)

func GetAllProducts() (string, []Product) {
	// Crea un slice de Product para almacenar los productos
	var products []Product

	db := database.GetConnection()
	defer db.Close()

	rows, err := db.Query("CALL getAllProducts()")
	if err != nil {
		return fmt.Sprintf("Error al ejecutar procedimiento almacenado getAllProducts(): %s", err), []Product{}
	}
	defer rows.Close()

	// Itera sobre los resultados de la consulta y crea objetos Product
	for rows.Next() {
		var p Product
		err := rows.Scan(&p.ProductID, &p.Imagen, &p.Nombre, &p.Descripcion, &p.Disponible, &p.Precio, &p.Categoria, &p.Vendedor)
		if err != nil {
			return fmt.Sprintf("Error al convertir productos: %s", err), []Product{}
		}
		products = append(products, p)
	}

	// Maneja cualquier error durante el escaneo de filas
	if err := rows.Err(); err != nil {
		return fmt.Sprintf("Error al iterar productos: %s", err), []Product{}
	}
	return "", products
}
