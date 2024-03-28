package logs

import (
	"fmt"
	"os"
	"path/filepath"
	"time"
)

/*
//main

package main

import "main/logs"

func main() {
	logs.AddLogItem("Prueba 1")
	logs.AddLogItem("Prueba 2")
	logs.AddLogItem("Prueba 3")
	logs.CreateLogFile()
}
*/

var logs_list []LogStruct

// Agrega un elemento a la lista de log
func AddLogItem(action string) {
	// Obtener la fecha y hora actual del sistema
	currentTime := time.Now()

	item := LogStruct{Action: action, Date: currentTime.Format("02/01/2006"), Hour: currentTime.Format("15:04:05")}
	//Agrega el elemento a la lista de logs
	logs_list = append(logs_list, item)
}

// Crea un archivo log y devuelve la ruta del archivo generado
func CreateLogFile() (string, error) {
	log_path := filepath.Join("logs", "files")

	// Crea el directorio de logs si no existe
	if err := os.MkdirAll(log_path, 0755); err != nil {
		return "", fmt.Errorf("error al crear carpeta de logs: %v", err)
	}
	// Obtener la fecha y hora actual del sistema
	currentTime := time.Now()
	filename := currentTime.Format("log_02-01-2006_15.04.05.log")
	fullFilename := filepath.Join(log_path, filename)

	// Crear o abrir el archivo para escritura
	file, err := os.OpenFile(fullFilename, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
	if err != nil {
		fmt.Println("Error al crear el archivo:", err)
		return "", fmt.Errorf("error al crear el archivo log: %v", err)
	}
	defer file.Close()

	//Escribe el encabezado
	_, err = file.WriteString("No.,Action,Date,Hour\n")
	if err != nil {
		return "", fmt.Errorf("error al escribir encabezados de log: %v", err)
	}

	//Recorre el slice de todos los logs registrados
	for i, item := range logs_list {
		_, err = file.WriteString(fmt.Sprintf("%d,%s,%s,%s\n", i+1, item.Action, item.Date, item.Hour))
		if err != nil {
			fmt.Println("Error al escribir log:", err)
			return "", fmt.Errorf("error al escribir log: %v", err)
		}
	}

	return fullFilename, nil
}
