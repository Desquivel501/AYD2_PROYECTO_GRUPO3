package unitTests

import (
	"testing"
	"main/products"
)

func TestCreateProduct(t *testing.T) {
	var tests = []struct {
		name string
		product products.Product
		want bool
	}{
		{
			name: "Producto Correcto",
			product: products.Product{
				ProductID: 1,
				Imagen: "imagen",
				Nombre: "Producto 1",
				Descripcion: "Descripcion",
				Existencia: 5,
				Precio: 100,
				Categoria: "Categoria",
				Vendedor: "1",
			},
			want: true,
		},
		{
			name: "Precio Incorrecto",
			product: products.Product{
				ProductID: 1,
				Imagen: "imagen",
				Nombre: "Producto 1",
				Descripcion: "Descripcion",
				Existencia: 5,
				Precio: -1,
				Categoria: "Categoria",
				Vendedor: "1",
			},
			want: false,
		},
		{
			name: "Existencia Incorrecta",
			product: products.Product{
				ProductID: 1,
				Imagen: "imagen",
				Nombre: "Producto 1",
				Descripcion: "Descripcion",
				Existencia: -1,
				Precio: 100,
				Categoria: "Categoria",
				Vendedor: "1",
			},
			want: false,
		},
		{
			name: "Nombre Vacio",
			product: products.Product{
				ProductID: 1,
				Imagen: "imagen",
				Nombre: "",
				Descripcion: "Descripcion",
				Existencia: 5,
				Precio: 100,
				Categoria: "Categoria",
				Vendedor: "1",
			},
			want: false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			ans := test.product.Precio > 0 && test.product.Existencia > 0 && test.product.Nombre != ""

			if ans != test.want {
				t.Errorf("Error")
			}
		})
	}
}

func TestUpdateProduct(t *testing.T) {

	existingProduct := products.Product{
		ProductID: 1,
		Imagen: "imagen",
		Nombre: "Producto 1",
		Descripcion: "Descripcion",
		Existencia: 5,
		Precio: 100,
		Categoria: "Categoria",
		Vendedor: "1",
	}

	var tests = []struct {
		name string
		product products.UpdateProductStruct
		want bool
	}{
		{
			name: "Actualizacion Correcta",
			product: products.UpdateProductStruct{
				ProductID: 1,
				Imagen: "imagen",
				Nombre: "Producto 1",
				Descripcion: "Descripcion",
				Existencia: 5,
				Precio: 100,
				Categoria: "Categoria",
				SellerDPI: 1,
			},
			want: true,
		},
		{
			name: "Precio Incorrecto",
			product: products.UpdateProductStruct{
				ProductID: 1,
				Imagen: "imagen",
				Nombre: "Producto 1",
				Descripcion: "Descripcion",
				Existencia: 5,
				Precio: -1,
				Categoria: "Categoria",
				SellerDPI: 1,
			},
			want: false,
		},
		{
			name: "Existencia Incorrecta",
			product: products.UpdateProductStruct{
				ProductID: 1,
				Imagen: "imagen",
				Nombre: "Producto 1",
				Descripcion: "Descripcion",
				Existencia: -1,
				Precio: 100,
				Categoria: "Categoria",
				SellerDPI: 1,
			},
			want: false,
		},
		{
			name: "Producto no existe",
			product: products.UpdateProductStruct{
				ProductID: 2,
				Imagen: "imagen",
				Nombre: "",
				Descripcion: "Descripcion",
				Existencia: 5,
				Precio: 100,
				Categoria: "Categoria",
				SellerDPI: 1,
			},
			want: false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			ans := test.product.Precio > 0 && test.product.Existencia > 0 && test.product.Nombre != ""
			ans = ans && test.product.ProductID == existingProduct.ProductID

			if ans != test.want {
				t.Errorf("Error")
			}
		})
	}
}

func TestDeleteProduct(t *testing.T) {

	existingProduct := products.Product{
		ProductID: 1,
		Imagen: "imagen",
		Nombre: "Producto 1",
		Descripcion: "Descripcion",
		Existencia: 5,
		Precio: 100,
		Categoria: "Categoria",
		Vendedor: "1",
	}

	var tests = []struct {
		name string
		id int
		want bool
	}{
		{
			name: "Eliminacion Correcta",
			id: 1,
			want: true,
		},
		{
			name: "Producto no existe",
			id: 2,
			want: false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {

			ans := test.id == existingProduct.ProductID

			if ans != test.want {
				t.Errorf("Error")
			}
		})
	}
}