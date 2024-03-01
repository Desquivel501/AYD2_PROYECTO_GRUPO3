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

func getProfile(user User) (User, error) {
	var response User
	db := database.GetConnection()
	defer db.Close()

	if user.Role == 0 || user.Role == 1 {
		result := db.QueryRow("CALL getProfile(?)", user.Dpi)
		err := result.Scan(&response.Email, &response.Name, &response.Dpi, &response.Image, &response.Role)
		if err != nil {
			return User{}, fmt.Errorf("error al ejecutar procedimiento almacenado getProfile(): %s", err.Error())
		}

	} else {
		result := db.QueryRow("CALL getSellerProfile(?)", user.Dpi)
		err := result.Scan(&response.Email, &response.Name, &response.Dpi, &response.Image, &response.Role, &response.Score)
		if err != nil {
			return User{}, fmt.Errorf("error al ejecutar procedimiento almacenado getSellerProfile(): %s", err.Error())
		}
	}

	return response, nil
}

func AcceptSeller(seller User) (Message, error) {
	var response Message
	db := database.GetConnection()
	defer db.Close()

	result := db.QueryRow("CALL AcceptSeller(?)", seller.Dpi)
	err := result.Scan(&response.Message, &response.Type)
	if err != nil {
		return Message{}, fmt.Errorf("error al ejecutar procedimiento almacenado acceptSeller(): %s", err.Error())
	}

	return response, nil
}

func DisableUser(user User) (Message, error) {
	var response Message
	db := database.GetConnection()
	defer db.Close()

	result := db.QueryRow("Call DisableUser(?)", user.Dpi)
	err := result.Scan(&response.Message, &response.Type)
	if err != nil {
		return Message{}, fmt.Errorf("error al ejecutar procedimiento almacenado disableUser(): %s", err.Error())
	}
	return response, nil
}

func EnableUser(user User) (Message, error) {
	var response Message
	db := database.GetConnection()
	defer db.Close()

	result := db.QueryRow("Call EnableUser(?)", user.Dpi)
	err := result.Scan(&response.Message, &response.Type)
	if err != nil {
		return Message{}, fmt.Errorf("error al ejecutar procedimiento almacenado EnableUser(): %s", err.Error())
	}
	return response, nil
}

func UpdateProfile(user User) (Message, error) {
	var response Message
	db := database.GetConnection()
	defer db.Close()

	result := db.QueryRow("Call UpdateProfile(?,?,?,?,?)", user.Email, user.Name, user.Password, user.Dpi, user.Image)
	err := result.Scan(&response.Message, &response.Type)
	if err != nil {
		return Message{}, fmt.Errorf("error al ejecutar procedimiento almacenado UpdateProfile(): %s", err.Error())
	}
	return response, nil
}

func GetAllUsers() ([]User, error) {
	var users []User
	db := database.GetConnection()
	defer db.Close()

	rows, err := db.Query("CALL getAllUsers()")
	if err != nil {
		return []User{}, fmt.Errorf("error al ejecutar procedimiento almacenado getAllusers(): %s", err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		var user User
		err := rows.Scan(&user.Email, &user.Name, &user.Dpi, &user.Role, &user.State, &user.Image)
		if err != nil {
			return []User{}, fmt.Errorf("error al convertir los usuarios: %s", err)
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		return []User{}, fmt.Errorf("error al iterar productos: %s", err)
	}

	return users, nil
}
