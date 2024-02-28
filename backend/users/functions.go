package users

import (
	"fmt"
	"main/database"
)

func Login(credentials Credentials) (Message, error) {
	var response Message
	db := database.GetConnection()
	defer db.Close()

	result := db.QueryRow("CALL login(?,?)", credentials.Email, credentials.Password)
	err := result.Scan(&response.Message, &response.Type)
	if err != nil {
		return Message{}, fmt.Errorf("error al ejecutar procedimiento almacenado login(): %s", err.Error())
	}

	return response, nil
}

func Register(new_user User) (Message, error) {
	var response Message
	role := 1
	if new_user.Type == "repartidor" {
		role = 2
	}

	db := database.GetConnection()
	defer db.Close()

	result := db.QueryRow("CALL register(?,?,?,?,?,?)",
		new_user.Email,
		new_user.Name,
		new_user.Password,
		new_user.Dpi,
		role,
		new_user.Image)

	err := result.Scan(&response.Message, &response.Type)
	if err != nil {
		return Message{}, fmt.Errorf("error al ejecutar procedimiento almacenado register(): %s", err.Error())
	}

	return response, nil
}
