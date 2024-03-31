package users

//Estructura para registro de usuario
type User struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Dpi      int64  `json:"dpi"`
	Password string `json:"password"`
	Image    string `json:"image"`
	Role     int16  `json:"role"`
	State    int16  `json:"state"`
	Score    int32  `json:"score"`
	Type     string `json:"type"`
}

//Estructura para credenciales
type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Mensaje de respuesta
type Message struct {
	Message string `json:"MESSAGE"`
	Type    string `json:"TYPE"`
	Data 	int64  `json:"DATA"`
}

type Message2 struct {
	Message 		string `json:"MESSAGE"`
	Type    		string `json:"TYPE"`
	RecoveryCode 	int64  `json:"RECOVERY_CODE"`
}

type ChangePassword struct {
	Email       string 	`json:"email"`
	Code 		int64 	`json:"code"`
	Password 	string 	`json:"password"`
}

type PaymentMethod struct {
	Alias      string  `json:"alias"`
	Cardholder string  `json:"cardholder"`
	Number	   int64   `json:"number"`
	Exp		   string  `json:"exp"`
	Cvv		   int64   `json:"cvv"`
	Dpi		   int64   `json:"dpi"`
	Id		   int64   `json:"id"`
}
