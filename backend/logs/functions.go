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
func GetHistory() ([]HistoryEntry, error) {
	// Crea un slice de HistoryEntry para almacenar los elementos de la bitácora
	var entries []HistoryEntry

	db := database.GetConnection()

	rows, err := db.Query("CALL getHistory()")
	if err != nil {
		return []HistoryEntry{}, fmt.Errorf("error al ejecutar procedimiento almacenado getBitacora(): %s", err.Error())
	}
	defer rows.Close()

	// Itera sobre los resultados de la consulta y crea objetos HistoryEntry
	for rows.Next() {
		var entry HistoryEntry
		err := rows.Scan(&entry.ID, &entry.Date, &entry.User, &entry.Action, &entry.Details)
		if err != nil {
			return []HistoryEntry{}, fmt.Errorf("error al convertir una entrada de la bitácora: %s", err)
		}
		entries = append(entries, entry)
	}

	// Maneja cualquier error durante el escaneo de filas
	if err := rows.Err(); err != nil {
		return []HistoryEntry{}, fmt.Errorf("error al iterar bitácora: %s", err)
	}
	return entries, nil
}

// Método que agrega una registro a a bitacora
func AddToHistory(user interface{}, action string, details string) error {
	db := database.GetConnection()
	var data1 string
	var data2 string = "admin"
	var dpi int

	// Verificamos el tipo de la variable user
	if val, ok := user.(int); ok {
		dpi = val
	} else if val, ok := user.(string); ok {
		data2 = val
	} else {
		return fmt.Errorf("error al insertar en bitácora: no se puede convertir el parametro de usuario: %v", user)
	}

	if dpi != 0 {
		err := db.QueryRow("CALL getProfile(?)", dpi).Scan(&data1, &data2)
		if err != nil {
			AddLogEvent("error al ejecutar procedimiento almacenado getProfile")
		}

		if data2 == "ERROR" {
			err = db.QueryRow("CALL getSellerProfile(?)", dpi).Scan(&data1, &data2)
			if err != nil {
				AddLogEvent("error al ejecutar procedimiento almacenado getSellerProfile")
			}
			if data2 == "ERROR" {
				AddLogEvent("error al agregar registro en bitácora: El usuario no existe")
				data2 = ""
			}
		}
	}

	err := db.QueryRow("CALL AddToHistory(?,?,?)",
		data2,
		action,
		details,
	).Scan(&data1, &data2)

	if err != nil {
		AddLogEvent("error al ejecutar procedimiento almacenado AddToHistory")
		return fmt.Errorf("error al ejecutar procedimiento almacenado AddToHistory: %s", err.Error())
	}

	AddLogEvent("Se agrega registro a la tabla history en la base de datos")
	return nil
}
