package unitTests

import (
	"testing"
	"net/mail"
	"main/users"
	"strconv"
)

func valid(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}

func TestLogin(t *testing.T) {

	var tests = []struct {
		name        string
		credentials users.Credentials // Use the fully qualified type name
		want        bool
	}{
		{
			name: "Login Correcto",
			credentials: users.Credentials{
				Email:    "test@gmail.com",
				Password: "password",
			},
			want: true,
		},
		{
			name: "Email no valido",
			credentials: users.Credentials{
				Email:    "test",
				Password: "password",
			},
			want: false,
		},
		{
			name: "Contraseña incorrecta",
			credentials: users.Credentials{
				Email:    "test@gmail.com",
				Password: "123456",
			},
			want: false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			ans := valid(test.credentials.Email)
			ans = ans && test.credentials.Password == "password"

			if ans != test.want {
				t.Errorf("Error")
			}
		})
	}
}

func TestRegister(t *testing.T) {
	
	var tests = []struct {
		name string
		user users.User
		want bool
	}{
		{
			name: "Registro Correcto",
			user: users.User{
				Name:     "test",
				Email:    "test@gmail.com",
				Dpi:      123456789,
				Password: "password",
				Image:    "image",
				Role:     1,
				State:    1,
				Score:    0,
				Type:     "type",
			},
			want: true,
		},
		{
			name: "Registro Incorrecto",
			user: users.User{
				Name:     "test",
				Email:    "test",
				Dpi:      123456789,
				Password: "password",
				Image:    "image",
				Role:     1,
				State:    1,
				Score:    0,
				Type:     "type",
			},
			want: false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			ans := valid(test.user.Email)
			

			if ans != test.want {
				t.Errorf("Error")
			}
		})
	}
}


func TestUpdate(t *testing.T) {
	
	var tests = []struct {
		name string
		user users.User
		want bool
	}{
		{
			name: "Actualizacion Correcta",
			user: users.User{
				Name:     "test",
				Email:    "test@gmail.com",
				Dpi:      123456789,
				Password: "password",
				Image:    "image",
				Role:     1,
				State:    1,
				Score:    0,
				Type:     "type",
			},
			want: true,
		},
		{
			name: "Actualizacion Incorrecta",
			user: users.User{
				Name:     "test",
				Email:    "test",
				Dpi:      123456789,
				Password: "password",
				Image:    "image",
				Role:     1,
				State:    1,
				Score:    0,
				Type:     "type",
			},
			want: false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			ans := valid(test.user.Email)
			

			if ans != test.want {
				t.Errorf("Error")
			}
		})
	}
}


func TestChangePassword(t *testing.T) {

	var code int64 = 123456
	
	var tests = []struct {
		name string
		changePassword users.ChangePassword
		want bool
	}{
		{
			name: "Cambio de contraseña Correcto",
			changePassword: users.ChangePassword{
				Email:    "test@gmail.com",
				Code:     123456,
				Password: "password",
			},
			want: true,
		},
		{
			name: "Codigo incorrecto",
			changePassword: users.ChangePassword{
				Email:    "test",
				Code:     457454,
				Password: "password",
			},
			want: false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			ans := test.changePassword.Code == code

			if ans != test.want {
				t.Errorf("Error")
			}
		})
	}
}


func TestCreatePaymentMethod (t *testing.T) {
	
	var tests = []struct {
		name string
		paymentMethod users.PaymentMethod
		want bool
	}{
		{
			name: "Creacion de metodo de pago Correcto",
			paymentMethod: users.PaymentMethod{
				Alias:      "alias",
				Cardholder: "cardholder",
				Number:     1234567890123456,
				Exp:        "exp",
				Cvv:        123,
				Dpi:        123456789,
				Id:         1,
			},
			want: true,
		},
		{
			name: "Numero de tarjeta incorrecto",
			paymentMethod: users.PaymentMethod{
				Alias:      "alias",
				Cardholder: "cardholder",
				Number:     32423455,
				Exp:        "exp",
				Cvv:        123,
				Dpi:        123456789,
				Id:         1,
			},
			want: false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			ans := len(strconv.FormatInt(test.paymentMethod.Number, 10)) == 16

			if ans != test.want {
				t.Errorf("Error")
			}
		})
	}
}