package reports

// Estructura para reporte OBTENER LOS PRODUCTOS MÁS VENDIDOS
type MostSelledProductEntry struct {
	ProductID   int    `json:"product_id"`
	Nombre      string `json:"nombre"`
	Precio      string `json:"precio"`
	Descripcion string `json:"descripcion"`
	Photo       string `json:"imagen"`

	Email            string `json:"email"`
	Name             string `json:"name"`
	CantidadVendidos string `json:"cantidad-vendidos"`
}

// Estructura para reporte mejor vendedor
type BestSellerEntry struct {
	Name            string `json:"name"`
	Email           string `json:"email"`
	DPI             string `json:"dpi"`
	Image           string `json:"image"`
	State           string `json:"state"`
	CantidadVendida int    `json:"cantidad-ventas"`
}

// Estructura para reporte categoria mas vendida
type MostSelledCategoryEntry struct {
	NombreCategoria string `json:"nombre_categoria"`
	CantidadVentas  int    `json:"cantidad-ventas"`
}
