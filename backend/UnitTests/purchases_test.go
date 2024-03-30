package unitTests

import (
	"testing"
	"main/purchases"
)

func TestPurchase(t *testing.T) {

	var existencia int64 = 5 

	var tests = []struct {
		name        string
		purchase purchases.Purchase
		want        bool
	}{
		{
			name: "Compra Correcta",
			purchase: purchases.Purchase{
				Client_id: 1,
				Products: []purchases.Product{
					{
						Id: 1,
						Name: "Producto 1",
						Image: "imagen",
						Price: 100,
						Amount: 2,
						Description: "Descripcion",
						Total: 200,
						Date: "2021-06-01",
					},
				},
				Total: 200,
				Payment_id: 1,
			},
			want: true,
		},
		{
			name: "Total Incorrecto",
			purchase: purchases.Purchase{
				Client_id: 1,
				Products: []purchases.Product{
					{
						Id: 1,
						Name: "Producto 1",
						Image: "imagen",
						Price: 100,
						Amount: 2,
						Description: "Descripcion",
						Total: 200,
						Date: "2021-06-01",
					},
				},
				Total: 300,
				Payment_id: 1,
			},
			want: false,
		},
		{
			name: "Sin existencias",
			purchase: purchases.Purchase{
				Client_id: 1,
				Products: []purchases.Product{
					{
						Id: 1,
						Name: "Producto 1",
						Image: "imagen",
						Price: 100,
						Amount: 50,
						Description: "Descripcion",
						Total: 200,
						Date: "2021-06-01",
					},
				},
				Total: 200,
				Payment_id: 1,
			},
			want: false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			
			ans := test.purchase.Products[0].Amount <= existencia
			ans = ans && test.purchase.Total == test.purchase.Products[0].Total

			if ans != test.want {
				t.Errorf("Error")
			}
		})
	}


}

