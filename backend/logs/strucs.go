package logs

// Estructura para manejar los logs a nivel de archivo
type LogStruct struct {
	Date  string
	Hour  string
	Event string
}

// Estructura para representar un elemento de la bitacora
type HistoryEntry struct {
	ID      int    `json:"id"`
	Date    string `json:"date"`
	User    string `json:"user"`
	Action  string `json:"action"`
	Details string `json:"details"`
}
