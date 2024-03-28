package users

import (
	"fmt"
	"main/database"
	"net/smtp"
	"github.com/joho/godotenv"
	"os"
	"log"
)

func SendEmail(email string, code int64) {

	err := godotenv.Load("secret/db.env")
	if err != nil {
		log.Fatalf("Error cargando el archivo .env: %s", err)
	}

	from :=  os.Getenv("EMAIL")
	password := os.Getenv("EMAIL_PASSWORD")
	to := email

	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: Codigo de recuperacion\n\n" +
		"Su codigo de recuperacion es: " + fmt.Sprintf("%d", code)
	
	err = smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", from, password, "smtp.gmail.com"),
		from, []string{to}, []byte(msg))

	if err != nil {
		fmt.Println("Error: ", err)
		return
	}

	fmt.Println("Email Sent!")

}

func Login(credentials Credentials) (Message, error) {
	var response Message
	db := database.GetConnection()

	result := db.QueryRow("CALL login(?,?)", credentials.Email, credentials.Password)
	err := result.Scan(&response.Message, &response.Type, &response.Data)
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

	if user.Role == 0 || user.Role == 1 {
		result := db.QueryRow("CALL getProfile(?)", user.Dpi)
		err := result.Scan(&response.Email, &response.Name, &response.Dpi, &response.Image, &response.Role, &response.State, &response.Password)
		if err != nil {
			return User{}, fmt.Errorf("error al ejecutar procedimiento almacenado getProfile(): %s", err.Error())
		}

	} else {
		result := db.QueryRow("CALL getSellerProfile(?)", user.Dpi)
		err := result.Scan(&response.Email, &response.Name, &response.Dpi, &response.Image, &response.Role, &response.Score, &response.State, &response.Password)
		if err != nil {
			return User{}, fmt.Errorf("error al ejecutar procedimiento almacenado getSellerProfile(): %s", err.Error())
		}
	}
	return response, nil
}

func AcceptSeller(seller User) (Message, error) {
	var response Message
	db := database.GetConnection()

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

func GetEnabledUsers() ([]User, error) {
	var users []User
	db := database.GetConnection()

	rows, err := db.Query("CALL getEnabledUsers()")
	if err != nil {
		return []User{}, fmt.Errorf("error al ejecutar procedimiento almacenado getEnabledUsers(): %s", err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		var user User
		err := rows.Scan(&user.Email, &user.Name, &user.Dpi, &user.Image, &user.Role, &user.State)
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

func GetDisabledUsers() ([]User, error) {
	var users []User
	db := database.GetConnection()

	rows, err := db.Query("CALL getDisabledUsers()")
	if err != nil {
		return []User{}, fmt.Errorf("error al ejecutar procedimiento almacenado getDisabledUsers(): %s", err.Error())
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

func GetPendingSellers() ([]User, error) {
	var users []User
	db := database.GetConnection()

	rows, err := db.Query("CALL getPendingSellers()")
	if err != nil {
		return []User{}, fmt.Errorf("error al ejecutar procedimiento almacenado getPendingSellers(): %s", err.Error())
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

func DeclineSeller(user User) (Message, error) {
	var response Message
	db := database.GetConnection()

	result := db.QueryRow("Call declineSeller(?)", user.Dpi)
	err := result.Scan(&response.Message, &response.Type)
	if err != nil {
		return Message{}, fmt.Errorf("error al ejecutar procedimiento almacenado declineSeller(): %s", err.Error())
	}
	return response, nil
}

func GenerateCode(changePassword ChangePassword) (Message2, error) {
	var response Message2
	db := database.GetConnection()

	result := db.QueryRow("Call CreateRecoveryCode(?)", changePassword.Email)
	err := result.Scan(&response.Message, &response.Type, &response.RecoveryCode)
	if err != nil {
		return Message2{}, fmt.Errorf("error al ejecutar procedimiento almacenado generateCode(): %s", err.Error())
	}

	SendEmail(changePassword.Email, response.RecoveryCode)

	return response, nil
}

func ValidateCode(changePassword ChangePassword) (Message2, error) {
	var response Message2
	db := database.GetConnection()

	result := db.QueryRow("Call ValidateCode(?,?)", changePassword.Email, changePassword.Code)
	err := result.Scan(&response.Message, &response.Type, &response.RecoveryCode)
	if err != nil {
		return Message2{}, fmt.Errorf("error al ejecutar procedimiento almacenado validateCode(): %s", err.Error())
	}

	return response, nil
}

func ChangePasswordFunc(changePassword ChangePassword) (Message, error) {
	var response Message
	db := database.GetConnection()

	result := db.QueryRow("Call ChangePassword(?,?)", changePassword.Email, changePassword.Password)
	err := result.Scan(&response.Message, &response.Type)
	if err != nil {
		return Message{}, fmt.Errorf("error al ejecutar procedimiento almacenado changePassword(): %s", err.Error())
	}

	return response, nil
}


func CreatePaymentMethod(payment PaymentMethod) (Message, error){
	var response Message
	db := database.GetConnection()

	result := db.QueryRow("Call addPaymentMethod(?,?,?,?,?,?)", payment.Alias, payment.Cardholder, payment.Number, payment.Exp, payment.Cvv, payment.Dpi)
	err := result.Scan(&response.Message, &response.Type)
	if err != nil {
		return Message{}, fmt.Errorf("error al ejecutar procedimiento almacenado changePassword(): %s", err.Error())
	}

	return response, nil
}

func GetPaymentMethods(dpi int64) ([]PaymentMethod, error){
	var payments []PaymentMethod
	db := database.GetConnection()

	rows, err := db.Query("CALL getPaymentMethods(?)", dpi)
	if err != nil {
		return []PaymentMethod{}, fmt.Errorf("error al ejecutar procedimiento almacenado getPaymentMethods(): %s", err.Error())
	}
	defer rows.Close()

	for rows.Next(){
		var payment PaymentMethod
		err := rows.Scan(&payment.Alias, &payment.Number, &payment.Id)
		if err != nil {
			return []PaymentMethod{}, fmt.Errorf("error al convertir ventas: %s", err)
		}

		payments = append(payments, payment)
	}

	if err := rows.Err(); err != nil {
		return []PaymentMethod{}, fmt.Errorf("error al iterar productos: %s", err)
	}

	return payments, nil
}