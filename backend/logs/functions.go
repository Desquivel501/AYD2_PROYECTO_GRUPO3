package logs

import (
	"fmt"
	"main/database"
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
func AddLogEvent(event string) {
	// Obtener la fecha y hora actual del sistema
	currentTime := time.Now()

	item := LogStruct{Event: event, Date: currentTime.Format("02/01/2006"), Hour: currentTime.Format("15:04:05")}
	//Agrega el elemento a la lista de logs
	logs_list = append(logs_list, item)
}

// Crea un archivo log y devuelve la ruta del archivo generado
func CreateLogFile() (string, error) {
	AddLogEvent("Se genera archivo log")

	log_path := filepath.Join("logs", "files")

	// Crea el directorio de logs si no existe
	if err := os.MkdirAll(log_path, 0755); err != nil {
		return "", fmt.Errorf("error al crear carpeta de logs: %v", err)
	}
	fullFilename := filepath.Join(log_path, "records.log")

	// Crear o abrir el archivo para escritura
	file, err := os.OpenFile(fullFilename, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0644)
	if err != nil {
		fmt.Println("Error al crear el archivo:", err)
		return "", fmt.Errorf("error al crear el archivo log: %v", err)
	}
	defer file.Close()

	//Escribe el encabezado
	_, err = file.WriteString("No.,Date,Hour,Event\n")
	if err != nil {
		return "", fmt.Errorf("error al escribir encabezados de log: %v", err)
	}

	//Recorre el slice de todos los logs registrados
	for i, item := range logs_list {
		_, err = file.WriteString(fmt.Sprintf("%d,%s,%s,%s\n", i+1, item.Date, item.Hour, item.Event))
		if err != nil {
			fmt.Println("Error al escribir log:", err)
			return "", fmt.Errorf("error al escribir log: %v", err)
		}
	}

	return fullFilename, nil
}

// Permite obtener todos los elementos de la bitácora
func GetBitacora() ([]BitacoraEntry, error) {
	// Crea un slice de BitacoraEntry para almacenar los elementos de la bitácora
	var entries []BitacoraEntry

	db := database.GetConnection()

	rows, err := db.Query("CALL getBitacora()")
	if err != nil {
		return []BitacoraEntry{}, fmt.Errorf("error al ejecutar procedimiento almacenado getBitacora(): %s", err.Error())
	}
	defer rows.Close()

	// Itera sobre los resultados de la consulta y crea objetos BitacoraEntry
	for rows.Next() {
		var entry BitacoraEntry
		err := rows.Scan(&entry.ID, &entry.Date, &entry.User, &entry.Action, &entry.Details)
		if err != nil {
			return []BitacoraEntry{}, fmt.Errorf("error al convertir una entrada de la bitácora: %s", err)
		}
		entries = append(entries, entry)
	}

	// Maneja cualquier error durante el escaneo de filas
	if err := rows.Err(); err != nil {
		return []BitacoraEntry{}, fmt.Errorf("error al iterar bitácora: %s", err)
	}
	return entries, nil
}
