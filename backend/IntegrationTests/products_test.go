package integrationTests

import (
	"testing"
	"strconv"
	"log"
	"time"
	"main/products"
)

var test_name string
var test_id int

func getMyProduct(data []products.Product)(products.Product){
	for _, product := range data{
		if product.Nombre == test_name{
			return product
		}
	}

	empty := products.Product{}

	return empty
}


func TestCreateProduct(t *testing.T) {

	test_name = "test" + strconv.FormatInt(time.Now().Unix(), 10)

	var tests = []struct {
		name string
		product products.Product
		want string
	}{
		{
			name: "Producto Correcto",
			product: products.Product{
				ProductID: 0,
				Imagen: "https://placehold.co/400",
				Nombre: test_name,
				Descripcion: "Descripcion",
				Existencia: 10,
				Precio: 100,
				Categoria: "Categoria",
				Vendedor: "3284612",
			},
			want: "SUCCESS",
		},
		{
			name: "Precio Incorrecto",
			product: products.Product{
				ProductID: 0,
				Imagen: "https://placehold.co/400",
				Nombre: test_name,
				Descripcion: "Descripcion",
				Existencia: 10,
				Precio: -80,
				Categoria: "Categoria",
				Vendedor: "3284612",
			},
			want: "ERROR",
		},
		{
			name: "Existencia Incorrecta",
			product: products.Product{
				ProductID: 0,
				Imagen: "https://placehold.co/400",
				Nombre: test_name,
				Descripcion: "Descripcion",
				Existencia: -10,
				Precio: 100,
				Categoria: "Categoria",
				Vendedor: "3284612",
			},
			want: "ERROR",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			ans, _ := products.CreateProduct(test.product)

			if ans.Type != test.want{
				t.Errorf("Error")
			}
		})
	}
}

func TestGetProducts(t *testing.T) {

	var tests = []struct {
		name string
		want bool
	}{
		{
			name: "Obtener Productos",
			want: true,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			data, err := products.GetAllProducts()
			test_id = getMyProduct(data).ProductID
		
			if err != nil || test_id == 0{
				t.Errorf("Error")
			}
		})
	}
}

func TestUpdateProduct(t *testing.T) {

	var tests = []struct {
		name string
		product products.UpdateProductStruct
		want string
	}{
		{
			name: "Actualizacion Correcta",
			product: products.UpdateProductStruct{
				ProductID: test_id,
				Imagen: "https://placehold.co/400",
				Nombre: test_name,
				Descripcion: "Descripcion",
				Existencia: 100,
				Precio: 100,
				Categoria: "Categoria",
				SellerDPI: 3284612,
			},
			want: "SUCCESS",
		},
		{
			name: "Precio Incorrecto",
			product: products.UpdateProductStruct{
				ProductID: test_id,
				Imagen: "https://placehold.co/400",
				Nombre: test_name,
				Descripcion: "Descripcion",
				Existencia: 100,
				Precio: -100,
				Categoria: "Categoria",
				SellerDPI: 3284612,
			},
			want: "ERROR",
		},
		{
			name: "Existencia Incorrecta",
			product: products.UpdateProductStruct{
				ProductID: test_id,
				Imagen: "https://placehold.co/400",
				Nombre: test_name,
				Descripcion: "Descripcion",
				Existencia: -100,
				Precio: 100,
				Categoria: "Categoria",
				SellerDPI: 3284612,
			},
			want: "ERROR",
		},
		{
			name: "Producto no existe",
			product: products.UpdateProductStruct{
				ProductID: 0,
				Imagen: "imagen",
				Nombre: "",
				Descripcion: "Descripcion",
				Existencia: 5,
				Precio: 100,
				Categoria: "Categoria",
				SellerDPI: 1,
			},
			want: "ERROR",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			ans, _ := products.UpdateProduct(test.product)

			if ans.Type != test.want {
				t.Errorf("Error")
			}
		})
	}
}

func TestDeleteProduct(t *testing.T) {

	// existingProduct := products.Product{
	// 	ProductID: test_id,
	// 	Imagen: "https://placehold.co/400",
	// 	Nombre: test_name,
	// 	Descripcion: "Descripcion",
	// 	Existencia: 100,
	// 	Precio: 100,
	// 	Categoria: "Categoria",
	// 	SellerDPI: 3284612,
	// }

	log.Println(test_id)

	var tests = []struct {
		name string
		id int
		want string
	}{
		{
			name: "Eliminacion Correcta",
			id: test_id,
			want: "SUCCESS",
		},
		{
			name: "Producto no existe",
			id: 0,
			want: "ERROR",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			// ans := test.id == existingProduct.ProductID
			ans, _ := products.DeleteProduct(test.id)
			
			log.Println(ans)

			if ans.Type != test.want {
				t.Errorf("Error")
			}
		})
	}
}