package root

import (
	"encoding/json"
	"net/http"
)

func RootHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Corriendo en el puerto 8080")
}
