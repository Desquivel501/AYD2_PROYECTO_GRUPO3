package reports

import (
	"fmt"
	"main/database"
)

// reporte Obtener los productos más vendidos
func GetMostSelledProducts() ([]MostSelledProductEntry, error) {
	// Crea un slice de MostSelledProductEntry para almacenar los productos
	var entries []MostSelledProductEntry

	db := database.GetConnection()

	rows, err := db.Query("CALL MostSelledProducts()")
	if err != nil {
		return []MostSelledProductEntry{}, fmt.Errorf("error al ejecutar procedimiento almacenado MostSelledProducts(): %s", err.Error())
	}
	defer rows.Close()

	// Itera sobre los resultados de la consulta y crea objetos MostSelledProductEntry
	for rows.Next() {
		var entry MostSelledProductEntry
		err := rows.Scan(
			&entry.ProductID,
			&entry.Nombre,
			&entry.Precio,
			&entry.Descripcion,
			&entry.Photo,
			&entry.Email,
			&entry.Name,
			&entry.CantidadVendidos,
		)
		if err != nil {
			return []MostSelledProductEntry{}, fmt.Errorf("error al convertir MostSelledProductEntry: %s", err)
		}
		entries = append(entries, entry)
	}

	// Maneja cualquier error durante el escaneo de filas
	if err := rows.Err(); err != nil {
		return []MostSelledProductEntry{}, fmt.Errorf("error al iterar MostSelledProductEntry: %s", err)
	}
	return entries, nil
}

// reporte Obtener mejores vendedores
func GetBestSeller() ([]BestSellerEntry, error) {
	// Crea un slice de BestSellerEntry para almacenar los productos
	var entries []BestSellerEntry

	db := database.GetConnection()

	rows, err := db.Query("CALL BestSellers()")
	if err != nil {
		return []BestSellerEntry{}, fmt.Errorf("error al ejecutar procedimiento almacenado BestSeller(): %s", err.Error())
	}
	defer rows.Close()

	// Itera sobre los resultados de la consulta y crea objetos BestSellerEntry
	for rows.Next() {
		var entry BestSellerEntry
		err := rows.Scan(
			&entry.Name,
			&entry.Email,
			&entry.DPI,
			&entry.Image,
			&entry.State,
			&entry.CantidadVendida,
		)
		if err != nil {
			return []BestSellerEntry{}, fmt.Errorf("error al convertir BestSellerEntry: %s", err)
		}
		entries = append(entries, entry)
	}

	// Maneja cualquier error durante el escaneo de filas
	if err := rows.Err(); err != nil {
		return []BestSellerEntry{}, fmt.Errorf("error al iterar BestSellerEntry: %s", err)
	}
	return entries, nil
}

// reporte obtener la categoria mas vendida
func GetMostSelledCategory() ([]MostSelledCategoryEntry, error) {
	// Crea un slice de MostSelledCategoryEntry para almacenar los productos
	var entries []MostSelledCategoryEntry

	db := database.GetConnection()

	rows, err := db.Query("CALL MostSelledCategories()")
	if err != nil {
		return []MostSelledCategoryEntry{}, fmt.Errorf("error al ejecutar procedimiento almacenado MostSelledCategories(): %s", err.Error())
	}
	defer rows.Close()

	// Itera sobre los resultados de la consulta y crea objetos MostSelledCategoryEntry
	for rows.Next() {
		var entry MostSelledCategoryEntry
		err := rows.Scan(
			&entry.NombreCategoria,
			&entry.CantidadVentas,
		)
		if err != nil {
			return []MostSelledCategoryEntry{}, fmt.Errorf("error al convertir MostSelledCategoryEntry: %s", err)
		}
		entries = append(entries, entry)
	}

	// Maneja cualquier error durante el escaneo de filas
	if err := rows.Err(); err != nil {
		return []MostSelledCategoryEntry{}, fmt.Errorf("error al iterar MostSelledCategoryEntry: %s", err)
	}
	return entries, nil
}

// reporte Obtener los productos más vendidos de un determinado vendedor
func GetMostSelledSProducts(dpi int) ([]MostSelledProductEntry, error) {
	// Crea un slice de MostSelledProductEntry para almacenar los productos
	var entries []MostSelledProductEntry

	db := database.GetConnection()

	rows, err := db.Query("CALL MostSelledSProducts(?)", dpi)
	if err != nil {
		return []MostSelledProductEntry{}, fmt.Errorf("error al ejecutar procedimiento almacenado MostSelledSProducts(): %s", err.Error())
	}
	defer rows.Close()

	// Itera sobre los resultados de la consulta y crea objetos MostSelledProductEntry
	for rows.Next() {
		var entry MostSelledProductEntry
		err := rows.Scan(
			&entry.ProductID,
			&entry.Nombre,
			&entry.Precio,
			&entry.Descripcion,
			&entry.Photo,
			&entry.Email,
			&entry.Name,
			&entry.CantidadVendidos,
		)
		if err != nil {
			return []MostSelledProductEntry{}, fmt.Errorf("error al convertir MostSelledProductEntry: %s", err)
		}
		entries = append(entries, entry)
	}

	// Maneja cualquier error durante el escaneo de filas
	if err := rows.Err(); err != nil {
		return []MostSelledProductEntry{}, fmt.Errorf("error al iterar MostSelledProductEntry: %s", err)
	}
	return entries, nil
}

// reporte obtener la categoria mas vendida
func GetMostSelledSCategory(dpi int) ([]MostSelledCategoryEntry, error) {
	// Crea un slice de MostSelledCategoryEntry para almacenar los productos
	var entries []MostSelledCategoryEntry

	db := database.GetConnection()

	rows, err := db.Query("CALL MostSelledSCategories(?)", dpi)
	if err != nil {
		return []MostSelledCategoryEntry{}, fmt.Errorf("error al ejecutar procedimiento almacenado MostSelledSCategories(): %s", err.Error())
	}
	defer rows.Close()

	// Itera sobre los resultados de la consulta y crea objetos MostSelledCategoryEntry
	for rows.Next() {
		var entry MostSelledCategoryEntry
		err := rows.Scan(
			&entry.NombreCategoria,
			&entry.CantidadVentas,
		)
		if err != nil {
			return []MostSelledCategoryEntry{}, fmt.Errorf("error al convertir MostSelledCategoryEntry: %s", err)
		}
		entries = append(entries, entry)
	}

	// Maneja cualquier error durante el escaneo de filas
	if err := rows.Err(); err != nil {
		return []MostSelledCategoryEntry{}, fmt.Errorf("error al iterar MostSelledCategoryEntry: %s", err)
	}
	return entries, nil
}
