package product

// Estructura para representar un producto
type Product struct {
	ProductID   int     `json:"product_id"`
	Nombre      string  `json:"nombre"`
	Vendedor    string  `json:"vendedor"`
	Existencia  int     `json:"existencia"`
	Precio      float64 `json:"precio"`
	Categoria   string  `json:"categoria"`
	Descripcion string  `json:"descripcion"`
	Imagen      string  `json:"imagen"`
}

// Estructura para representar un producto
type SellerProduct struct {
	ProductID   int     `json:"product_id"`
	Nombre      string  `json:"nombre"`
	Existencia  int     `json:"existencia"`
	Precio      float64 `json:"precio"`
	Categoria   string  `json:"categoria"`
	Descripcion string  `json:"descripcion"`
	Imagen      string  `json:"imagen"`
}

type UpdateProductStruct struct {
	ProductID   int     `json:"product_id"`
	Nombre      string  `json:"nombre"`
	Existencia  int     `json:"existencia"`
	Precio      float64 `json:"precio"`
	Categoria   string  `json:"categoria"`
	Descripcion string  `json:"descripcion"`
	SellerDPI   int64   `json:"dpi_vendedor"`
	Imagen      string  `json:"imagen"`
}

type StatusResponse struct {
	Message string `json:"message"`
	Type    string `json:"type"`
}
