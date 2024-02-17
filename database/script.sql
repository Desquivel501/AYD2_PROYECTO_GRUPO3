DELIMITER $$

CREATE DATABASE IF NOT EXISTS proyecto $$

USE proyecto $$

-- ########################### CREACIÓN DE LA TABLA DE CATEGORÍAS DE PRODUCTOS ###########################
CREATE TABLE IF NOT EXISTS prod_category(
	cat_id INTEGER AUTO_INCREMENT NOT NULL,
	prod_cat VARCHAR(150),
	PRIMARY KEY(cat_id)
) $$

-- ########################### CREACIÓN DE LA TABLA DE USUARIOS ###########################
CREATE TABLE IF NOT EXISTS users(
	email VARCHAR(200) NOT NULL,
	name VARCHAR(150) NOT NULL,
	password VARCHAR(100) NOT NULL,
	dpi INTEGER NOT NULL,
	role INTEGER NOT NULL,
	register_date DATETIME,
	state INTEGER NOT NULL,
	image VARCHAR(200),
	PRIMARY KEY(email)
) $$

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR ADMINISTRADORES ###########################
CREATE TABLE IF NOT EXISTS administrators(
	email VARCHAR(200) NOT NULL,
	-- Datos o reportes extras de administrador
	PRIMARY KEY(email),
	FOREIGN KEY(email) REFERENCES users(email)
) $$

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR CLIENTES ###########################
CREATE TABLE IF NOT EXISTS clients(
	email VARCHAR(200) NOT NULL,
	-- Datos o reportes extras de clients
	PRIMARY KEY(email),
	FOREIGN KEY(email) REFERENCES users(email)
) $$

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR VENDEDORES ###########################
CREATE TABLE IF NOT EXISTS sellers(
	email VARCHAR(200) NOT NULL,
	score INTEGER,
	PRIMARY KEY(email),
	FOREIGN KEY(email) REFERENCES users(email)
) $$

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR CUPONES ###########################
CREATE TABLE IF NOT EXISTS coupon(
	coupon_id INTEGER AUTO_INCREMENT NOT NULL,
	name VARCHAR(200),
	discoint DECIMAL,
	used BOOLEAN DEFAULT FALSE,
	email VARCHAR(200),
	PRIMARY KEY(coupon_id),
	FOREIGN KEY(email) REFERENCES users(email)
) $$

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR FORMAS DE PAGO ###########################
CREATE TABLE IF NOT EXISTS payment_method(
	payment_id INTEGER AUTO_INCREMENT NOT NULL,
	alias VARCHAR(200),
	number BIGINT,
	exp VARCHAR(10),
	cvv INTEGER,
	email VARCHAR(200),
	PRIMARY KEY(payment_id),
	FOREIGN KEY(email) REFERENCES users(email)
) $$

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR PRODUCTOS ###########################
CREATE TABLE IF NOT EXISTS products(
	prod_id INTEGER AUTO_INCREMENT NOT NULL,
	photo VARCHAR(200),
	name VARCHAR(100),
	description VARCHAR(200),
	existence INTEGER,
	price DECIMAL,
	email VARCHAR(200),
	cat_id INTEGER NOT NULL,
	PRIMARY KEY(prod_id),
	FOREIGN KEY(email) REFERENCES users(email),
	FOREIGN KEY(cat_id) REFERENCES prod_category(cat_id)
) $$ 

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR COMPRAS ###########################
CREATE TABLE IF NOT EXISTS purchase(
	purchase_id INTEGER AUTO_INCREMENT NOT NULL,
	description VARCHAR(200),
	score INTEGER,
	seller VARCHAR(200),
	buyer VARCHAR(200),
	total DECIMAL,
	PRIMARY KEY(purchase_id),
	FOREIGN KEY(buyer) REFERENCES users(email),
	FOREIGN KEY(seller) REFERENCES sellers(email)
) $$

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR DETALLES DE COMPRAS ###########################
CREATE TABLE IF NOT EXISTS purchase_details(
	purchase_id INTEGER,
	prod_id INTEGER,
	amount INTEGER NOT NULL,
	total_price DECIMAL NOT NULL,
	FOREIGN KEY(purchase_id) REFERENCES purchase(purchase_id),
	FOREIGN KEY(prod_id) REFERENCES products(prod_id)
) $$