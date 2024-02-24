package product

// Estructura para representar un producto
type Product struct {
	ProductID   int     `json:"product_id"`
	Nombre      string  `json:"nombre"`
	Vendedor    string  `json:"vendedor"`
	Disponible  bool    `json:"disponible"`
	Precio      float64 `json:"precio"`
	Categoria   string  `json:"categoria"`
	Descripcion string  `json:"descripcion"`
	Imagen      string  `json:"imagen"`
}
