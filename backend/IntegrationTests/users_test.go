package unitTests

import (
	"testing"
	"main/users"
	"strconv"
	"log"
	"time"
)

var test_email string

func TestMain(t *testing.T) {

	var test_user = users.User{
		Name:     "test",
		Email:    "test@gmail.com",
		Dpi:      123456789,
		Password: "password",
		Image:    "image",
		Role:     1,
		State:    1,
		Score:    0,
		Type:     "type",
	}

	_ , err := users.Register(test_user)
	if err != nil {
		t.Errorf("Error")
	}
}

func TestLogin(t *testing.T) {

	var tests = []struct {
		name        string
		credentials users.Credentials // Use the fully qualified type name
		want        string
	}{
		{
			name: "Login Correcto",
			credentials: users.Credentials{
				Email:    "test@gmail.com",
				Password: "password",
			},
			want: "SUCCESS",
		},
		{
			name: "Email no valido",
			credentials: users.Credentials{
				Email:     "test",
				Password: "password",
			},
			want: "ERROR",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			ans, _ := users.Login(test.credentials)

			if ans.Type != test.want {
				t.Errorf("Error")
			}
		})
	}
}

func TestRegister(t *testing.T) {

	test_email = "test" + strconv.FormatInt(time.Now().Unix(), 10) + "@gmail.com"
	
	var tests = []struct {
		name string
		user users.User
		want string
	}{
		{
			name: "Registro Correcto",
			user: users.User{
				Name:     "test",
				Email:    test_email,
				Dpi:      time.Now().Unix(),
				Password: "password",
				Image:    "image",
				Role:     1,
				State:    1,
				Score:    0,
				Type:     "type",
			},
			want: "SUCCESS",
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
			want: "ERROR",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			log.Println(test.user.Email)

			ans , _ := users.Register(test.user)
			if ans.Type != test.want {
				t.Errorf("Error")
			}
		})
	}
}


func TestUpdate(t *testing.T) {
	
	var tests = []struct {
		name string
		user users.User
		want string
	}{
		{
			name: "Actualizacion Correcta",
			user: users.User{
				Name:     "testy test",
				Email:    "test@gmail.com",
				Dpi:      123456789,
				Password: "password",
				Image:    "image",
				Role:     1,
				State:    1,
				Score:    0,
				Type:     "type",
			},
			want: "SUCCESS",
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
			want: "ERROR",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			ans , _ := users.UpdateProfile(test.user)

			if ans.Type != test.want {
				t.Errorf("Error")
			}
		})
	}
}

func TestGetProfile(t *testing.T) {

	var tests = []struct {
		name string
		user users.User
		want int64
	}{
		{
			name: "Obtener Perfil Correcto",
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
			want: 123456789,
		},
		{
			name: "Obtener Perfil Incorrecto",
			user: users.User{
				Name:     "test",
				Email:    "test",
				Dpi:      -1,
				Password: "password",
				Image:    "image",
				Role:     1,
				State:    1,
				Score:    0,
				Type:     "type",
			},
			want: 0,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			ans , _ := users.GetProfile(test.user)

			if ans.Dpi != test.want {
				t.Errorf("Error")
			}
		})
	}
}

func TestCreatePaymentMethod(t *testing.T) {

	var tests = []struct {
		name string
		payment users.PaymentMethod
		want string
	}{
		{
			name: "Metodo de Pago Correcto",
			payment: users.PaymentMethod{
				Alias: "alias",
				Cardholder: "cardholder",
				Number: 123456789,
				Exp: "exp",
				Cvv: 123,
				Dpi: 123456789,
				Id: 1,
			},
			want: "SUCCESS",
		},
		{
			name: "Metodo de Pago Incorrecto",
			payment: users.PaymentMethod{
				Alias: "",
				Cardholder: "cardholder",
				Number: 123456789,
				Exp: "exp",
				Cvv: 123,
				Dpi: -1,
				Id: 1,
			},
			want: "ERROR",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			ans , _ := users.CreatePaymentMethod(test.payment)
			log.Println(ans)

			if ans.Type != test.want {
				t.Errorf("Error")
			}
		})
	}
}