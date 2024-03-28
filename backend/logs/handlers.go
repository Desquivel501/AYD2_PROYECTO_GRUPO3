package logs

import (
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
