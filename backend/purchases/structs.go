package purchases

type product struct {
	Id     		int64  `json:"product_id"`
	Name   		string `json:"name"`
	Image  		string `json:"image"`
	Price  		int64  `json:"price"`
	Amount 		int64  `json:"amount"`
	Description string `json:"description"`
	Total 		int64  `json:"total"`
	Date		string `json:"date"`
}

type purchase struct {
	Client_id  int64              `json:"client_id"`
	Products   []product `json:"productos"`
	Total      int64              `json:"total"`
	Payment_id int64              `json:"payment_id"`
}

type Message struct {
	Message string `json:"MESSAGE"`
	Type    string `json:"TYPE"`
	Data    int64  `json:"DATA"`
}

type Client_purchase struct {
	Purchase_id int64     `json:"purchase_id"`
	Name        string    `json:"name"`
	Dpi         int64     `json:"dpi"`
	Products    []product `json:"products"`
}
