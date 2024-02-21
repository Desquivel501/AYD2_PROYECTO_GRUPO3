DELIMITER $$

CREATE DATABASE IF NOT EXISTS proyecto $$

USE proyecto $$

-- ########################### CREACIÓN DE LA TABLA DE CATEGORÍAS DE PRODUCTOS ###########################
CREATE TABLE IF NOT EXISTS prod_categories(
	cat_id INTEGER AUTO_INCREMENT NOT NULL,
	prod_cat VARCHAR(150),
	
	PRIMARY KEY(cat_id)
) $$

/*
	ROLES:
    0- ADMINISTRADOR
    1- CLIENTE
    2- VENDEDOR
*/

/*
	ESTADOS DE CUENTA:
    0- DESHABILITADA
    1- HABILITADA
    2- PENDIENTE
*/

-- ########################### CREACIÓN DE LA TABLA DE USUARIOS ###########################
CREATE TABLE IF NOT EXISTS users(
	email VARCHAR(200) NOT NULL,
	name VARCHAR(150) NOT NULL,
	password VARCHAR(100) NOT NULL,
	dpi BIGINT NOT NULL,
	role INTEGER NOT NULL,
	register_date DATETIME DEFAULT NOW(),
	state INTEGER NOT NULL,
	image VARCHAR(200),
	
	PRIMARY KEY(email)
) $$

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR ADMINISTRADORES ###########################
CREATE TABLE IF NOT EXISTS administrators(
	email VARCHAR(200) NOT NULL,
	-- Datos o reportes extras de administrador
	PRIMARY KEY(email),
	FOREIGN KEY(email) REFERENCES users(email) ON DELETE CASCADE
) $$

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR CLIENTES ###########################
CREATE TABLE IF NOT EXISTS clients(
	email VARCHAR(200) NOT NULL,
	-- Datos o reportes extras de clients
	PRIMARY KEY(email),
	FOREIGN KEY(email) REFERENCES users(email) ON DELETE CASCADE
) $$

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR VENDEDORES ###########################
CREATE TABLE IF NOT EXISTS sellers(
	email VARCHAR(200) NOT NULL,
	score INTEGER DEFAULT 0,
	
	PRIMARY KEY(email),
	FOREIGN KEY(email) REFERENCES users(email) ON DELETE CASCADE
) $$

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR CUPONES ###########################
CREATE TABLE IF NOT EXISTS coupons(
	coupon_id INTEGER AUTO_INCREMENT NOT NULL,
	name VARCHAR(200),
	discount DECIMAL,
	used BOOLEAN DEFAULT FALSE,
	email VARCHAR(200),
	
	PRIMARY KEY(coupon_id),
	FOREIGN KEY(email) REFERENCES users(email) ON DELETE CASCADE
) $$

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR FORMAS DE PAGO ###########################
CREATE TABLE IF NOT EXISTS payment_methods(
	payment_id INTEGER AUTO_INCREMENT NOT NULL,
	cardholder_name VARCHAR(200),
	number BIGINT,
	exp VARCHAR(10),
	cvv INTEGER,
	email VARCHAR(200),
	
	PRIMARY KEY(payment_id),
	FOREIGN KEY(email) REFERENCES users(email) ON DELETE CASCADE
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
	cat_id INTEGER,
	
	PRIMARY KEY(prod_id),
	FOREIGN KEY(email) REFERENCES users(email) ON DELETE CASCADE,
	FOREIGN KEY(cat_id) REFERENCES prod_categories(cat_id) ON DELETE SET NULL
) $$ 

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR COMPRAS ###########################
CREATE TABLE IF NOT EXISTS purchases(
	purchase_id INTEGER AUTO_INCREMENT NOT NULL,
	description VARCHAR(200),
	score INTEGER,
	seller VARCHAR(200),
	buyer VARCHAR(200),
	total DECIMAL,
	
	PRIMARY KEY(purchase_id),
	FOREIGN KEY(buyer) REFERENCES users(email) ON DELETE SET NULL,
	FOREIGN KEY(seller) REFERENCES sellers(email) ON DELETE SET NULL
) $$

-- ########################### CREACIÓN DE LA TABLA PARA ALMACENAR DETALLES DE COMPRAS ###########################
CREATE TABLE IF NOT EXISTS purchase_details(
	purchase_id INTEGER,
	prod_id INTEGER,
	amount INTEGER NOT NULL,
	total_price DECIMAL NOT NULL,
	
	FOREIGN KEY(purchase_id) REFERENCES purchases(purchase_id) ON DELETE SET NULL,
	FOREIGN KEY(prod_id) REFERENCES products(prod_id) ON DELETE SET NULL
) $$