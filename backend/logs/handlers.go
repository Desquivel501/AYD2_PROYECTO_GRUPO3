package logs

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

func DownloadLogFileHandler(w http.ResponseWriter, r *http.Request) {
	//Crea un archivo de log
	filename, err := CreateLogFile()
	//Si encuentra un error
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	archivo, err := os.Open(filename)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer archivo.Close()

	// Configurar la cabecera de respuesta para indicar que se está enviando un archivo
	w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=%s", filepath.Base(archivo.Name())))
	w.Header().Set("Content-Type", "text/plain")

	// Copia el contenido del archivo al cuerpo de la respuesta
	_, err = io.Copy(w, archivo)
	if err != nil {
		http.Error(w, "Error al enviar el archivo", http.StatusInternalServerError)
		return
	}
}

func GetHistoryHandler(w http.ResponseWriter, r *http.Request) {
	result, err := GetHistory()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		AddLogEvent(err.Error())
		return
	}

	if len(result) == 0 {
		result = make([]HistoryEntry, 0)
	}

	AddLogEvent("Se obtiene a todos los elementos de la bitácora")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}
