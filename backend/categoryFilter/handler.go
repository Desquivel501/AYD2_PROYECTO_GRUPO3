package categoryfilter

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func CategoryFilterHandler(w http.ResponseWriter, r *http.Request) {
	data, err := ioutil.ReadAll(r.Body)

	if err != nil {
		fmt.Println("Error reading data: ", err)
	}
	var category Category
	category.Category = "compras"
	er := json.Unmarshal([]byte(data), &category)

	if er != nil {
		fmt.Println("Error getting data: ", er)
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(category)
}
