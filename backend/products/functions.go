package products

import (
	"fmt"
	"main/database"
)

// Permite obtener todos los productos
func GetAllProducts() ([]Product, error) {
	// Crea un slice de Product para almacenar los productos
	var products []Product

	db := database.GetConnection()

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

// Permite obtener un producto por medio de su código de identificación
func GetProduct(id int) (Product, error) {
	//Crea un objeto Producto para retornar en la petición
	var p Product

	db := database.GetConnection()

	err := db.QueryRow("CALL getProduct(?)", id).Scan(&p.ProductID, &p.Nombre, &p.Existencia, &p.Precio, &p.Descripcion, &p.Imagen, &p.Categoria, &p.Vendedor)
	if err != nil {
		return Product{}, fmt.Errorf("error al ejecutar procedimiento almacenado getProduct(): %s", err.Error())
	}

	return p, nil
}

// Método que obtiene los productos de un determinado vendedor
func GetSellerProducts(id int) ([]SellerProduct, error) {
	// Crea un slice de Product para almacenar los productos del vendedor
	var products []SellerProduct

	db := database.GetConnection()

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

// Método que actualiza producto
func UpdateProduct(p UpdateProductStruct) (StatusResponse, error) {
	//Obtiene la conexion a la base de datos
	db := database.GetConnection()

	//Resltado del procedimiento
	var s StatusResponse

	//Ejecuta el query de actualización
	err := db.QueryRow("CALL updateProduct(?,?,?,?,?,?,?,?)",
		p.ProductID,
		p.Imagen,
		p.Nombre,
		p.Descripcion,
		p.Existencia,
		p.Precio,
		p.SellerDPI,
		p.Categoria,
	).Scan(&s.Message, &s.Type)

	if err != nil {
		return StatusResponse{Type: "ERROR", Message: s.Message}, fmt.Errorf("error al ejecutar procedimiento almacenado updateProduct(): %s", err.Error())
	}

	if s.Type == "ERROR" {
		return StatusResponse{Type: "ERROR", Message: s.Message}, fmt.Errorf("error al ejecutar procedimiento almacenado updateProduct(): %s", s.Message)
	}

	//Retorna el estado del query
	return s, nil
}

// Método que elimina producto
func DeleteProduct(id int) (StatusResponse, error) {
	//Obtiene la conexion a la base de datos
	db := database.GetConnection()

	//Resultado del procedimiento
	var s StatusResponse

	//Ejecuta el procedimiento almacenado para eliminar producto
	err := db.QueryRow("CALL deleteProduct(?)", id).Scan(&s.Message, &s.Type)

	if err != nil {
		return StatusResponse{Type: "ERROR", Message: s.Message}, fmt.Errorf("error al ejecutar procedimiento almacenado updateProduct(): %s", err.Error())
	}

	if s.Type == "ERROR" {
		return StatusResponse{Type: "ERROR", Message: s.Message}, fmt.Errorf("error al ejecutar procedimiento almacenado updateProduct(): %s", s.Message)
	}

	//Retorna el estado del query
	return s, nil
}

// Método que crea producto
func CreateProduct(p Product) (StatusResponse, error) {
	db := database.GetConnection()

	var s StatusResponse

	err := db.QueryRow("CALL addProduct(?,?,?,?,?,?,?)",
		p.Imagen,
		p.Nombre,
		p.Descripcion,
		p.Existencia,
		p.Precio,
		p.Vendedor,
		p.Categoria,
	).Scan(&s.Message, &s.Type)

	if err != nil {
		return StatusResponse{Type: "ERROR", Message: s.Message}, fmt.Errorf("error al ejecutar procedimiento almacenado addProduct(): %s", err.Error())
	}

	if s.Type == "ERROR" {
		return StatusResponse{Type: "ERROR", Message: s.Message}, fmt.Errorf("error al ejecutar procedimiento almacenado addProduct(): %s", s.Message)
	}

	return s, nil
}
