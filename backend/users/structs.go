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
