package product

import (
	"fmt"
	"main/database"
)

func GetAllProducts() ([]Product, error) {
	// Crea un slice de Product para almacenar los productos
	var products []Product

	db := database.GetConnection()
	defer db.Close()

	rows, err := db.Query("CALL getAllProducts()")
	if err != nil {
		return []Product{}, fmt.Errorf("error al ejecutar procedimiento almacenado getAllProducts(): %s", err.Error())
	}
	defer rows.Close()

	// Itera sobre los resultados de la consulta y crea objetos Product
	for rows.Next() {
		var p Product
		err := rows.Scan(&p.ProductID, &p.Imagen, &p.Nombre, &p.Descripcion, &p.Existencia, &p.Precio, &p.Categoria, &p.Vendedor)
		if err != nil {
			return []Product{}, fmt.Errorf("error al convertir productos: %s", err)
		}
		products = append(products, p)
	}

	// Maneja cualquier error durante el escaneo de filas
	if err := rows.Err(); err != nil {
		return []Product{}, fmt.Errorf("error al iterar productos: %s", err)
	}
	return products, nil
}

func GetProduct(id int) (Product, error) {
	//Crea un objeto Producto para retornar en la petición
	var p Product

	db := database.GetConnection()
	defer db.Close()

	err := db.QueryRow("CALL getProduct(?)", id).Scan(&p.ProductID, &p.Nombre, &p.Existencia, &p.Precio, &p.Descripcion, &p.Imagen, &p.Categoria, &p.Vendedor)
	if err != nil {
		return Product{}, fmt.Errorf("error al ejecutar procedimiento almacenado getProduct(): %s", err.Error())
	}

	return p, nil
}

func GetSellerProducts(id int) ([]SellerProduct, error) {
	// Crea un slice de Product para almacenar los productos del vendedor
	var products []SellerProduct

	db := database.GetConnection()
	defer db.Close()

	rows, err := db.Query("CALL getSellerProducts(?)", id)
	if err != nil {
		return []SellerProduct{}, fmt.Errorf("error al ejecutar procedimiento almacenado getAllProducts(): %s", err.Error())
	}
	defer rows.Close()

	// Itera sobre los resultados de la consulta y crea objetos Product
	for rows.Next() {
		var p SellerProduct
		err := rows.Scan(&p.ProductID, &p.Imagen, &p.Nombre, &p.Descripcion, &p.Existencia, &p.Precio, &p.Categoria)
		if err != nil {
			return []SellerProduct{}, fmt.Errorf("error al convertir productos: %s", err)
		}
		products = append(products, p)
	}

	// Maneja cualquier error durante el escaneo de filas
	if err := rows.Err(); err != nil {
		return []SellerProduct{}, fmt.Errorf("error al iterar productos: %s", err)
	}
	return products, nil
}
