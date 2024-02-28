package users

import (
	// "encoding/json"
	// "fmt"
	// "io/ioutil"
	"encoding/json"
	"io"
	"net/http"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var credentials Credentials
	body, _ := io.ReadAll(r.Body)
	json.Unmarshal(body, &credentials)

	result, err := Login(credentials)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var new_user User
	body, _ := io.ReadAll(r.Body)
	json.Unmarshal(body, &new_user)

	result, err := Register(new_user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}
