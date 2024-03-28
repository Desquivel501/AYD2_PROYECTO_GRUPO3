package purchases

import (
	"encoding/json"
	"fmt"
	"main/database"
)

func CreatePurchase(purchase purchase) (Message, error) {
	var response Message
	var purchase_id int64
	db := database.GetConnection()

	fmt.Println(purchase)

	// Comprobando si existen existencias suficientes para continuar con la orden
	for _, product := range purchase.Products {
		result := db.QueryRow("CALL EnoughExistences(?,?)", product.Id, product.Amount)
		err := result.Scan(&response.Message, &response.Type)
		if err != nil {
			return Message{}, fmt.Errorf("error al ejecutar procedimiento almacenado EnoughExistences(): %s", err.Error())
		}

		if response.Type == "ERROR" {
			return response, nil
		}
	}

	//Creando orden
	result := db.QueryRow("CALL createPurchase(\"\",?,?,?)", purchase.Client_id, purchase.Payment_id, purchase.Total)
	err := result.Scan(&response.Message, &response.Type, &response.Data)
	if err != nil {
		return Message{}, fmt.Errorf("error al ejecutar procedimiento almacenado createPurchase(): %s", err.Error())
	}

	if response.Type == "ERROR" {
		return response, nil
	}

	//Agregando productos a la orden
	purchase_id = response.Data
	for _, product := range purchase.Products {
		result = db.QueryRow("CALL addProductToPurchase(?,?,?)", purchase_id, product.Id, product.Amount)
		err := result.Scan(&response.Message, &response.Type)
		if err != nil {
			return Message{}, fmt.Errorf("error al ejecutar procedimiento almacenado addProductToPurchase(): %s", err.Error())
		}
		if response.Type == "ERROR" {
			return response, nil
		}
	}

	response.Message = "La orden ha sido creada exitosamente"
	response.Type = "SUCCESS"
	return response, nil
}

func GetClientPurchases(dpi int64) ([]Client_purchase, error) {
	var client_purchases []Client_purchase
	var products_str string

	db := database.GetConnection()

	rows, err := db.Query("CALL getClientPurchases(?)", dpi)
	if err != nil {
		return []Client_purchase{}, fmt.Errorf("error al ejecutar procedimiento almacenado getAllProducts(): %s", err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		var client_purchase Client_purchase
		err := rows.Scan(&client_purchase.Purchase_id, &client_purchase.Name, &client_purchase.Dpi, &products_str)
		if err != nil {
			return []Client_purchase{}, fmt.Errorf("error al convertir ventas: %s", err)
		}

		err = json.Unmarshal([]byte(products_str), &client_purchase.Products)
		if err != nil {
			return []Client_purchase{}, fmt.Errorf("error al convertir productos: %s", err)
		}

		client_purchases = append(client_purchases, client_purchase)
	}

	if err := rows.Err(); err != nil {
		return []Client_purchase{}, fmt.Errorf("error al iterar productos: %s", err)
	}

	return client_purchases, nil
}

func GetSellerSales(dpi int64) ([]product, error) {
	var products []product

	db := database.GetConnection()
	rows, err := db.Query("CALL getSellerSales(?)", dpi)
	if err != nil {
		return []product{}, fmt.Errorf("error al ejecutar procedimiento almacenado getSellerSales(): %s", err.Error())
	}
	defer rows.Close()	

	for rows.Next() {
		var prod product
		err := rows.Scan(&prod.Id, &prod.Image, &prod.Name, &prod.Description, &prod.Amount, &prod.Total, &prod.Date)
		if err != nil {
			return []product{}, fmt.Errorf("error al convertir productos: %s", err)
		}

		products = append(products, prod)
	}

	if err := rows.Err(); err != nil {
		return []product{}, fmt.Errorf("error al iterar productos: %s", err)
	}

	return products, nil
}
