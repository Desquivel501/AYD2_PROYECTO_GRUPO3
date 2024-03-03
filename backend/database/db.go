package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var dbUser string
var dbPassword string
var dbHost string
var dbPort string
var dbName string

var Connection *sql.DB
var err error

func GetConnection() *sql.DB {
	if Connection == nil {
		if len(dbHost) == 0 {
			// Carga las variables de entorno desde el archivo db.env
			err = godotenv.Load("secret/db.env")
			if err != nil {
				log.Fatalf("Error cargando el archivo .env: %s", err)
			}
			// Obtiene las credenciales de la base de datos desde las variables de entorno
			dbUser = os.Getenv("DB_USER")
			dbPassword = os.Getenv("DB_PASSWORD")
			dbHost = os.Getenv("DB_HOST")
			dbPort = os.Getenv("DB_PORT")
			dbName = os.Getenv("DB_NAME")
		}
		dbURI := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName)

		// Configura la conexión a la base de datos MySQL
		Connection, err = sql.Open("mysql", dbURI)
		if err != nil {
			log.Fatal(err)
		} else {
			fmt.Println("Conexión establecida con la base de datos")
		}

		return Connection
	} else {
		fmt.Println("Retornando conexión existente")
		return Connection
	}
}
