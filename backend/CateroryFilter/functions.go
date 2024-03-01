package categoryfilter

import (
	"fmt"
	"main/database"
)

func GetAllCategories() ([]Categoria, error) {

	var categories []Categoria

	db := database.GetConnection()
	defer db.Close()

	rows, err := db.Query("CALL getProdCategories()")
	if err != nil {
		return []Categoria{}, fmt.Errorf("error al ejecutar procedimiento almacenado getProdCategories(): %s", err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		var category Categoria
		err := rows.Scan(&category.ID, &category.Catedory)
		if err != nil {
			return []Categoria{}, fmt.Errorf("error al convertir categorias: %s", err)
		}
		categories = append(categories, category)
	}

	if err := rows.Err(); err != nil {
		return []Categoria{}, fmt.Errorf("error al iterar categorias: %s", err)
	}
	return categories, nil
}
