package users

import (
	// "encoding/json"
	"fmt"
	"main/logs"
	"strconv"

	// "io/ioutil"
	"encoding/json"
	"net/http"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var credentials Credentials
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&credentials)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := Login(credentials)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent(fmt.Sprintf("Inicia sesión el usuario %s", credentials.Email))
	logs.AddToHistory(0, "Login", fmt.Sprintf("Inicia sesión el usuario %s", credentials.Email))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var new_user User
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&new_user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := Register(new_user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	logs.AddLogEvent(fmt.Sprintf("Se crea usuario %s", new_user.Email))
	logs.AddToHistory(0, "Registrar usuario", fmt.Sprintf("Se registra usuario %s", new_user.Name))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func ProfileHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var user User
	err := decoder.Decode(&user)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := GetProfile(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	logs.AddLogEvent("Se obtiene perfil de usuario")
	logs.AddToHistory(0, "Obtener usuario", fmt.Sprintf("Se obtiene usuario %s", user.Email))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func AcceptSellerHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var user User
	err := decoder.Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := AcceptSeller(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	logs.AddLogEvent(fmt.Sprintf("Se acepta a vendedor con email %s", user.Email))
	logs.AddToHistory(0, "Aceptar vendedor", fmt.Sprintf("Se acepta vendedor %s", user.Email))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func DisableUserHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var user User
	err := decoder.Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := DisableUser(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent(fmt.Sprintf("Se deshabilita usuario %s", user.Email))
	logs.AddToHistory(user.Dpi, "Deshabilitar usuario", fmt.Sprintf("Se deshabilita usuario %s", user.Email))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func EnableUserHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var user User
	err := decoder.Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := EnableUser(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent(fmt.Sprintf("Se habilita usuario %s", user.Email))
	logs.AddToHistory(user.Dpi, "Habilitar usuario", fmt.Sprintf("Se habilita usuario %s", user.Email))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func UpdateProfileHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var user User
	err := decoder.Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := UpdateProfile(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent(fmt.Sprintf("Se actualiza usuario con email %s", user.Email))
	logs.AddToHistory(user.Dpi, "Actualizar perfil", fmt.Sprintf("Se actualiza perfil del usuario %s", user.Email))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func AllUsersHandler(w http.ResponseWriter, r *http.Request) {
	result, err := GetAllUsers()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	if len(result) == 0 {
		result = make([]User, 0)
	}

	logs.AddLogEvent("Se obtiene a todos los usuarios")
	logs.AddToHistory(0, "Listar usuarios", "Se obtiene lista de usuarios")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func EnabledUsersHandler(w http.ResponseWriter, r *http.Request) {
	result, err := GetEnabledUsers()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	if len(result) == 0 {
		result = make([]User, 0)
	}

	logs.AddLogEvent("Se obtiene usuarios activos")
	w.Header().Set("Content-Type", "application/json")
	logs.AddToHistory(0, "Listar usuarios", "Se obtiene lista de usuarios activos")
	json.NewEncoder(w).Encode(result)
}

func DisabledUsersHandler(w http.ResponseWriter, r *http.Request) {
	result, err := GetDisabledUsers()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	if len(result) == 0 {
		result = make([]User, 0)
	}

	logs.AddLogEvent("Se deshabilita usuarios")
	logs.AddToHistory(0, "Listar usuarios", "Se obtiene el listado de usuarios deshabilitados")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func PendingSellersHandler(w http.ResponseWriter, r *http.Request) {
	result, err := GetPendingSellers()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	if len(result) == 0 {
		result = make([]User, 0)
	}

	logs.AddLogEvent("Se obtiene lista de vendedores pendientes de confirmación")
	logs.AddToHistory(0, "Listar vendedores pendiente", "Se obtiene lista de vendedores pendiente")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func DeclineSellerHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var user User
	err := decoder.Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := DeclineSeller(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent(fmt.Sprintf("Se rechaza vendedor %s", user.Email))
	logs.AddToHistory(0, "Rechazar usuario", fmt.Sprintf("Se rechaza a usuario %s", user.Email))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func GenerateCodeHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var changePassword ChangePassword
	err := decoder.Decode(&changePassword)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := GenerateCode(changePassword)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent("Se genera un código de acceso de usuario")
	logs.AddToHistory(0, "Generar código acceso", fmt.Sprintf("Se genera código de acceso para el usuario %s", changePassword.Email))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func ValidateCodeHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var changePassword ChangePassword
	err := decoder.Decode(&changePassword)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := ValidateCode(changePassword)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent("Se valida código de acceso de usuario")
	logs.AddToHistory(0, "Validar código", fmt.Sprintf("Se válida código de acceso del usuario %s", changePassword.Email))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func ChangePasswordHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var changePassword ChangePassword
	err := decoder.Decode(&changePassword)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := ChangePasswordFunc(changePassword)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent("El usuario modifica su contraseña")
	logs.AddToHistory(0, "Cambiar contraseña", fmt.Sprintf("Se cambia la contraseña del usuario %s", changePassword.Email))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func CreatePaymentMethodHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var payment PaymentMethod
	err := decoder.Decode(&payment)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := CreatePaymentMethod(payment)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent("Se crea un método de pago")
	logs.AddToHistory(payment.Dpi, "Crear metodo de pago", fmt.Sprintf("Se crea método de pago %s", payment.Alias))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func GetPaymentMethodsHandler(w http.ResponseWriter, r *http.Request) {
	dpi_str := r.URL.Query().Get("dpi")
	if dpi_str == "" {
		http.Error(w, "Parámetro 'dpi' no encontrado en la URL /user/get-payment-methods", http.StatusBadRequest)
		logs.AddLogEvent("Parámetro 'dpi' no encontrado en la URL /user/get-payment-methods")
		return
	}

	dpi, err := strconv.ParseInt(dpi_str, 10, 64)
	if err != nil {
		http.Error(w, "Parámetro 'id' no es un valor válido en de un vendedor", http.StatusBadRequest)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := GetPaymentMethods(dpi)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent("Se ha obtenido los distintos método de pago")
	logs.AddToHistory(dpi, "Obtener metodos de pago", "Se obtiene una lista de pagos")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}


func RatePurchaseHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var rate purchase_rating
	err := decoder.Decode(&rate)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}

	result, err := RatePurchase(rate)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logs.AddLogEvent(err.Error())
		return
	}
	logs.AddLogEvent("Se calificó una compra")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}