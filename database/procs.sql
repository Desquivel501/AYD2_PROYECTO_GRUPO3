DELIMITER $$

USE proyecto $$

-- ########################################## PROCEDIMIENTO PARA LOGIN ####################################################
CREATE PROCEDURE IF NOT EXISTS login(
	IN email_in VARCHAR(200),
	IN password_in VARCHAR(100)
)
login:BEGIN
	DECLARE role INTEGER;
	DECLARE status INTEGER;
	DECLARE dpi BIGINT;

	SELECT -1 INTO role;
	
	SELECT u.role, u.state, u.dpi INTO role, status, dpi
	FROM users u 
	WHERE u.email = email_in
	AND u.password = password_in;

	IF role = -1 THEN
		SELECT 'Credenciales de inicio de sesión incorrectas, revise su usuario o contraseña' AS 'MESSAGE',
		'ERROR' AS 'TYPE',
		-999 as 'DATA';
		LEAVE login;
	END IF;

	IF status = 0 THEN
		SELECT 'Error de inicio de sesión, su cuenta se encuentra deshabilitada' AS 'MESSAGE',
		'ERROR' AS 'TYPE',
		-999 as 'DATA';
		LEAVE login;
	END IF;

	IF status = 2 THEN
		SELECT 'Error de inicio de sesión, su cuenta se encuentra pendiente de confirmación por parte de un administrador' AS 'MESSAGE',
		'ERROR' AS 'TYPE',
		-999 as 'DATA';
		LEAVE login;
	END IF;

	SELECT role AS 'MESSAGE',
	'SUCCESS' AS 'TYPE',
	dpi AS 'DATA';
END $$

-- ########################################## PROCEDIMIENTO PARA REGISTRO DE CLIENTE ####################################################
CREATE PROCEDURE IF NOT EXISTS register(
	IN email_in VARCHAR(200),
	IN name_in VARCHAR(150),
	IN password_in VARCHAR(100),
	IN dpi_in BIGINT,
	IN role_in INTEGER,
	IN image_in VARCHAR(200)
)
user_register:BEGIN
	IF NOT ValidEmail(email_in) THEN
		SELECT 'El correo que ha ingresado no tiene un formato válido' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE user_register;
	END IF;

	IF EmailExists(email_in) THEN
		SELECT 'El correo que ha ingresado ya se encuentra registrado' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE user_register;
	END IF;

	IF name_in = '' OR name_in IS NULL THEN 
		SELECT 'Los nombres no pueden estar en blanco' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE user_register;
	END IF;

	IF image_in = '' OR image_in IS NULL THEN 
		SELECT 'Se debe agregar una fotografía de usuario' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE user_register;
	END IF;

	IF dpi_in = 0 OR dpi_in IS NULL THEN 
		SELECT 'Se debe indicar el DPI para crer una cuenta' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE user_register;
	END IF;

	IF password_in = '' OR password_in IS NULL THEN 
		SELECT 'Se debe agregar una contraseña para la cuenta' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE user_register;
	END IF;

	IF UserExists(dpi_in) THEN
		SELECT 'El dpi ingresado ya pertenece a un usuario en el sistema' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE user_register;
	END IF;

	INSERT INTO users(email, name, password, dpi, role, state, image)
	VALUES (email_in, name_in, password_in, dpi_in, role_in, role_in, image_in);
	
	IF role_in = 1 THEN
		INSERT INTO clients(dpi)
		VALUES (dpi_in);
	ELSE 
		INSERT INTO sellers(dpi)
		VALUES (dpi_in);
	END IF;

	SELECT 'El usuario ha sido registrado exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- ########################################## PROCEDIMIENTO PARA ACEPTAR LA CUENTA DE UN VENDEDOR ####################################################
CREATE PROCEDURE IF NOT EXISTS AcceptSeller(
	IN dpi_in BIGINT
)
accept_seller:BEGIN
	
	IF(NOT UserExists(dpi_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE accept_seller;
	END IF;

	IF(NOT StatePending(dpi_in)) THEN
		SELECT 'El usuario que se intenta aceptar no tiene estado pendiente' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE accept_seller;
	END IF;

	IF(NOT IsSeller(dpi_in)) THEN
		SELECT 'El correo ingresado no pertenece a un vendedor' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE accept_seller;	
	END IF;

	UPDATE users s
	SET s.state = 1
	WHERE s.dpi  = dpi_in;

	SELECT 'La cuenta fue aceptada correctamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$

-- ########################################## PROCEDIMIENTO PARA RECHAZAR LA CUENTA DE UN VENDEDOR ####################################################
CREATE PROCEDURE IF NOT EXISTS declineSeller(
	IN dpi_in BIGINT
)
decline_seller:BEGIN
	IF(NOT UserExists(dpi_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE decline_seller;
	END IF;

	IF(NOT StatePending(dpi_in)) THEN
		SELECT 'El usuario que se intenta aceptar no tiene estado pendiente' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE decline_seller;
	END IF;

	IF(NOT IsSeller(dpi_in)) THEN
		SELECT 'El correo ingresado no pertenece a un vendedor' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE decline_seller;	
	END IF;

	DELETE FROM users u
	WHERE u.dpi = dpi_in;

	SELECT 'La cuenta fue rechazara correctamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$

-- ########################################## PROCEDIMIENTO PARA OBTENER TODOS LOS VENDEDORES PENDIENTES DE ACEPTAR #################################################### 
CREATE PROCEDURE IF NOT EXISTS getPendingSellers()
get_pending_sellers:BEGIN
	SELECT u.email AS email,
	u.name AS name,
	u.dpi AS dpi,
	u.`role` AS role,
	u.state AS state,
	u.image AS image
	FROM users u
	WHERE u.`role` = 2
	AND u.state = 2;
END $$

-- ########################################## PROCEDIMIENTO PARA VER EL PERFIL DE UN USUARIO ####################################################
CREATE PROCEDURE IF NOT EXISTS getProfile(
	IN dpi_in BIGINT
)
get_profile:BEGIN
	
	IF(NOT UserExists(dpi_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE get_profile;
	END IF;

	SELECT u.email AS email,
	u.name AS name,
	u.dpi AS dpi,
	u.image AS image,
	u.`role` AS role,
	u.state AS state,
	u.password AS password
	FROM users u 
	WHERE u.dpi  = dpi_in;
END $$


-- ########################################## PROCEDIMIENTO PARA VER EL PERFIL DE UN VENDEDOR ####################################################
CREATE PROCEDURE IF NOT EXISTS getSellerProfile(
	IN dpi_in BIGINT
)
get_seller_profile:BEGIN
	
	IF(NOT UserExists(dpi_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE get_seller_profile;
	END IF;
	
	IF(NOT IsSeller(dpi_in)) THEN
		SELECT 'El correo ingresado no pertenece a un vendedor' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE get_seller_profile;	
	END IF;

	SELECT u.email AS email,
	u.name AS name,
	u.dpi AS dpi,
	u.image AS image,
	u.`role` AS role,
	s.score AS score,
	u.state AS state,
	u.password AS password
	FROM users u 
	JOIN sellers s 
	ON u.dpi = s.dpi  
	AND u.dpi = dpi_in;
END $$

-- ########################################## PROCEDIMIENTO PARA EDITAR EL PERFIL DE UN USUARIO #################################################### 
CREATE PROCEDURE IF NOT EXISTS UpdateProfile(
	IN email_in VARCHAR(200),
	IN name_in VARCHAR(200),
	IN password_in VARCHAR(200),
	IN dpi_in BIGINT,
	IN image_in VARCHAR(200)
)
update_profile:BEGIN
	DECLARE prev_email VARCHAR(200);

	SELECT u.email INTO prev_email
	FROM users u 
	WHERE u.dpi = dpi_in;

	IF NOT ValidEmail(email_in) THEN
		SELECT 'El correo que ha ingresado no tiene un formato válido' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_profile;
	END IF;

	IF prev_email != email_in THEN
		IF EmailExists(email_in) THEN
			SELECT 'El correo que ha ingresado ya se encuentra registrado' AS 'MESSAGE',
			'ERROR' AS 'TYPE';
			LEAVE update_profile;
		END IF;
	END IF;

	IF name_in = '' OR name_in IS NULL THEN 
		SELECT 'Los nombres no pueden estar en blanco' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_profile;
	END IF;

	IF image_in = '' OR image_in IS NULL THEN 
		SELECT u.image INTO image_in
		FROM users u 
		WHERE u.dpi = dpi_in;
	END IF;

	IF dpi_in = 0 OR dpi_in IS NULL THEN 
		SELECT 'Se debe indicar el DPI para crer una cuenta' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_profile;
	END IF;

	IF password_in = '' OR password_in IS NULL THEN 
		SELECT 'Se debe agregar una contraseña para la cuenta' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_profile;
	END IF;

	UPDATE users u
	SET u.password = password_in,
	u.email = email_in,
	u.name = name_in,
	u.dpi = dpi_in,
	u.image = image_in
	WHERE u.dpi = dpi_in;

	SELECT 'Los datos han sido actualizados exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- ########################################## PROCEDIMIENTO PARA DESHABILITAR UN USUARIO ####################################################
CREATE PROCEDURE IF NOT EXISTS DisableUser(
	IN dpi_in BIGINT
)
disable_user:BEGIN
	
	IF(NOT UserExists(dpi_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE disable_user;
	END IF;

	UPDATE users u 
	SET u.state = 0
	WHERE u.dpi = dpi_in;

	SELECT 'El usuario ha sido deshabilitado exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- ########################################## PROCEDIMIENTO PARA HABILITAR UN USUARIO ####################################################
CREATE PROCEDURE IF NOT EXISTS EnableUser(
	IN dpi_in BIGINT
)
enable_user:BEGIN
	
	IF(NOT UserExists(dpi_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE enable_user;
	END IF;

	UPDATE users u 
	SET u.state = 1
	WHERE u.dpi = dpi_in;

	SELECT 'El usuario ha sido habilitado exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


--  ########################################## PROCEDIMIENTO PARA OBTENER USUARIOS HABILITADOS ####################################################
CREATE PROCEDURE IF NOT EXISTS getEnabledUsers()
BEGIN
	SELECT u.email AS email,
	u.name AS name,
	u.dpi AS dpi,
	u.image AS image,
	u.`role` AS role,
	u.state AS state
	FROM users u
	WHERE u.`role` != 0
	AND u.state = 1;
END $$

--  ########################################## PROCEDIMIENTO PARA OBTENER USUARIOS DESHABILITADOS ####################################################
CREATE PROCEDURE IF NOT EXISTS getDisabledUsers()
BEGIN
	SELECT u.email AS email,
	u.name AS name,
	u.dpi AS dpi,
	u.`role` AS role,
	u.state AS state,
	u.image AS image
	FROM users u
	WHERE u.`role` != 0
	AND u.state = 0;
END $$


-- ########################################## PROCEDIMIENTO PARA AGREGAR UN CUPÓN A UN USUARIO ####################################################
CREATE PROCEDURE IF NOT EXISTS CreateCoupon(
	IN dpi_in BIGINT,
	IN name_in VARCHAR(200),
	IN discount_in DECIMAL
)
create_coupon:BEGIN

	IF(NOT UserExists(dpi_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE create_coupon;
	END IF;

	IF(discount_in < 0) THEN
		SELECT 'El descuento debe ser mayor a 0' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE create_coupon;
	END IF;

	IF name_in = '' OR name_in IS NULL THEN 
		SELECT 'Los nombres de los cupones no pueden estar en blanco' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_coupon;
	END IF;

	INSERT INTO coupons(name, discount, used, dpi)
	VALUES (name_in, discount_in, FALSE, dpi_in);
	
	SELECT 'Cupón asignado exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';

END $$


-- ########################################## PROCEDIMIENTO PARA AGREGAR UNA NUEVA FORMA DE PAGO ####################################################
CREATE PROCEDURE IF NOT EXISTS addPaymentMethod(
	alias_in VARCHAR(200),
	cardholder_in VARCHAR(200),
	number_in BIGINT,
	exp_in VARCHAR(10),
	cvv_in INTEGER,
	dpi_in BIGINT
)
add_payment_method:BEGIN
	IF NOT UserExists(dpi_in) THEN
		SELECT 'El usuario no existe en la base de datos' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_payment_method;
	END IF;

	IF PaymentAliasExists(dpi_in, alias_in) THEN
		SELECT 'Ya posee una forma de pago con este nombre' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_payment_method;
	END IF;

	IF number_in < 0 OR cvv_in < 0 THEN
		SELECT 'Los datos de la tarjeta no son válidos' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_payment_method;
	END IF;

	INSERT INTO payment_methods(alias, cardholder_name, number, exp, cvv, dpi)
	VALUES (alias_in, cardholder_in, number_in, exp_in, cvv_in, dpi_in);

	SELECT 'El método de pago ha sido agregado exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$

-- ########################################## PROCEDIMIENTO PARA OBTENER FORMAS DE PAGO DE UN CLIENTE ####################################################
CREATE PROCEDURE IF NOT EXISTS getPaymentMethods(
	IN dpi_in BIGINT
)
get_payment_methods:BEGIN
	IF NOT UserExists(dpi_in) THEN
		SELECT 'El usuario no existe en la base de datos' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE get_payment_methods;
	END IF;	

	SELECT pm.alias,
	pm.`number` 
	FROM payment_methods pm 
	WHERE pm.dpi = dpi_in;
END $$

-- ########################################## PROCEDIMIENTO PARA AGREGAR UNA CATEGORÍA DE PRODUCTO ####################################################
CREATE PROCEDURE IF NOT EXISTS addProdCategory(
	IN category_in VARCHAR(150)
)
add_prod_category:BEGIN
	
	IF(CategoryId(category_in) < 0) THEN
		INSERT INTO prod_categories(prod_cat )
		VALUES (category_in );
	
		SELECT 'Categoría creada exitósamente' AS 'MESSAGE',
		'SUCCESS' AS 'TYPE';
		LEAVE add_prod_category;
	END IF;

	SELECT 'La categoría ya existe' AS 'MESSAGE',
	'ERROR' AS 'TYPE';
END $$


-- ########################################## PROCEDIMIENTO PARA OBTENER TODAS LAS CATEGORÍAS ####################################################
CREATE PROCEDURE IF NOT EXISTS getProdCategories()
BEGIN
	SELECT 
		cat_id AS id,
		prod_cat AS category
	FROM prod_categories;
END $$


-- ########################################## PROCEDIMIENTO PARA CREAR UN PRODUCTO ####################################################
CREATE PROCEDURE IF NOT EXISTS addProduct(
	photo_in VARCHAR(200),
	name_in VARCHAR(100),
	description_in VARCHAR(200),
	existence_in INTEGER,
	price_in DECIMAL,
	dpi_in BIGINT,
	category_in VARCHAR(150)
)
add_product:BEGIN 
	DECLARE prod_category INTEGER;
	SELECT CategoryId(category_in) INTO prod_category;
	
	IF prod_category < 0 THEN
		CALL addProdCategory(category_in);
		SELECT CategoryId(category_in) INTO prod_category;
	END IF;
	
	IF photo_in = '' OR photo_in IS NULL THEN 
		SELECT 'Se debe agregar una fotografía de producto' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_product;
	END IF;

	IF name_in = '' OR name_in IS NULL THEN 
		SELECT 'Se debe agregar un nombre de producto' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_product;
	END IF;

	IF existence_in < 0 THEN 
		SELECT 'Número de existencias de producto no válido' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_product;
	END IF;

	IF price_in < 0 THEN 
		SELECT 'El precio del producto no es válido' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_product;
	END IF;

	IF ProductExists(name_in, dpi_in) THEN
		SELECT 'Ya existe un producto con el nombre ingresado' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_product;
	END IF;
	
	INSERT INTO products(photo, name, description, existence, price, dpi, cat_id)
	VALUES(photo_in, name_in, description_in, existence_in, price_in, dpi_in, prod_category);

	SELECT 'El producto ha sido agregado exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$

-- ########################################## PROCEDIMIENTO PARA EDITAR UN PRODUCTO ####################################################
CREATE PROCEDURE IF NOT EXISTS updateProduct(
	prod_id_in INTEGER,
	photo_in VARCHAR(200),
	name_in VARCHAR(100),
	description_in VARCHAR(200),
	existence_in INTEGER,
	price_in DECIMAL,
	dpi_in BIGINT,
	category_in VARCHAR(150)
)
update_product:BEGIN
	DECLARE prod_category INTEGER;
	DECLARE prev_name VARCHAR(100);
	SELECT CategoryId(category_in) INTO prod_category;
	
	IF prod_category < 0 THEN
		CALL addProdCategory(category_in);
		SELECT CategoryId(category_in) INTO prod_category;
	END IF;

	SELECT p.name INTO prev_name
	FROM products p 
	WHERE p.prod_id = prod_id_in;
	
	IF photo_in = '' OR photo_in IS NULL THEN 
		SELECT p.photo INTO photo_in
		FROM products p 
		WHERE p.prod_id = prod_id_in;
	END IF;

	IF name_in = '' OR name_in IS NULL THEN 
		SELECT 'Se debe agregar un nombre de producto' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_product;
	END IF;

	IF existence_in < 0 THEN 
		SELECT 'Número de existencias de producto no válido' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_product;
	END IF;

	IF price_in < 0 THEN 
		SELECT 'El precio del producto no es válido' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_product;
	END IF;
	
	IF prev_name != name_in THEN
		IF ProductExists(name_in, dpi_in) THEN
			SELECT 'Ya existe un producto con el nombre ingresado' AS 'MESSAGE',
			'ERROR' AS 'TYPE';
			LEAVE update_product;
		END IF;
	END IF;

	UPDATE products p
	SET	p.photo = photo_in,
	p.name  = name_in,
	p.description = description_in,
	p.existence = existence_in,
	p.price = price_in,
	p.cat_id = prod_category
	WHERE p.prod_id = prod_id_in;

	SELECT 'El producto ha sido editado exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$

-- ########################################## PROCEDIMIENTO PARA RETORNAR LOS PRODUCTOS DE UN VENDEDOR ####################################################
CREATE PROCEDURE IF NOT EXISTS getSellerProducts(
	dpi_in BIGINT
)
get_seller_products:BEGIN
	
	IF NOT UserExists(dpi_in) THEN
		SELECT 'El usuario no existe en la base de datos' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE get_seller_products;
	END IF;

	SELECT p.prod_id AS id,
	p.photo AS image,
	p.name AS nombre,
	p.description AS descripcion,
	p.existence AS existencia,
	p.price AS precio,
	pc.prod_cat AS categoria
	FROM products p 
	JOIN prod_categories pc 
	ON p.cat_id = pc.cat_id 
	AND p.dpi = dpi_in;
END $$

-- ########################################## PROCEDIMIENTO PARA RETORNAR TODOS LOS PRODUCTOS ####################################################
CREATE PROCEDURE IF NOT EXISTS getAllProducts()
BEGIN
	SELECT p.prod_id AS product_id,
	p.photo AS imagen,
	p.name AS nombre,
	p.description AS descripcion,
	p.existence AS existencia,
	p.price AS precio,
	pc.prod_cat AS categoria,
	u.name AS vendedor
	FROM products p 
	JOIN prod_categories pc 
	ON p.cat_id = pc.cat_id
	JOIN users u 
	ON p.dpi = u.dpi;
END $$

-- ########################################## PROCEDIMIENTO PARA RETORNAR UN PRODUCTO EN CONCRETO ####################################################
CREATE PROCEDURE IF NOT EXISTS getProduct(
	IN prod_id_in INTEGER
)
BEGIN
		SELECT p.prod_id AS product_id,
		p.name  AS nombre,
		p.existence AS existencia,
		p.price AS precio,
		p.description AS descripcion,
		p.photo AS imagen,
		pc.prod_cat AS categoria,
		u.name AS vendedor
		FROM products p
		JOIN users u 
		ON u.dpi = p.dpi 
		JOIN prod_categories pc 
		ON p.cat_id = pc.cat_id 
		AND p.prod_id = prod_id_in;
END $$


-- ########################################## PROCEDIMIENTO PARA RETORNAR UN PRODUCTO EN CONCRETO ####################################################
CREATE PROCEDURE IF NOT EXISTS deleteProduct(
	IN prod_id_in INTEGER
)
delete_product:BEGIN
	IF NOT ProducIdExists(prod_id_in) THEN
		SELECT 'El producto que desea eliminar no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE delete_product;
	END IF;

	DELETE FROM products p
	WHERE p.prod_id = prod_id_in;

	SELECT 'El producto ha sido eliminado exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- ########################################## PROCEDIMIENTO PARA OBTENER TODOS LOS USUARIOS ####################################################
CREATE PROCEDURE IF NOT EXISTS getAllUsers()
BEGIN
	SELECT u.email AS email,
	u.name AS name,
	u.dpi AS dpi,
	u.`role` AS role,
	u.state AS state,
	u.image AS image
	FROM users u
	WHERE u.`role` != 0;
END $$


-- ########################################## PROCEDIMIENTO PARA CREAR UN NUEVO PEDIDO ####################################################
CREATE PROCEDURE IF NOT EXISTS createPurchase(
	IN description_in VARCHAR(200),
	IN buyer_in BIGINT,
	IN payment_id_in INTEGER,
	IN total_in DECIMAL
)
create_purchase:BEGIN
	IF total_in < 0 THEN
		SELECT 'El total de un pedido debe ser positivo' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_purchase;
	END IF;

	IF NOT UserExists(buyer_in) THEN
		SELECT 'El usuario indicado no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_purchase;
	END IF;

	IF NOT PaymentMethodExists(buyer_in, payment_id_in) THEN
		SELECT 'El cliente no cuenta con la forma de pago indicada' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_purchase;
	END IF;

	INSERT INTO purchases(description, buyer, payment_id, purchase_date, total)
	VALUES(description_in, buyer_in, payment_id_in, NOW(), total_in);

	SELECT 'Compra agregada de forma exitosa a la base de datos' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE',
	LAST_INSERT_ID() AS 'DATA';
END $$


-- ########################################## PROCEDIMIENTO PARA SABER SI EXISTE DISPONIBILIDAD DE UN PRODUCTO ####################################################
CREATE PROCEDURE IF NOT EXISTS EnoughExistences(
	prod_id_in INTEGER,
	amount_in INTEGER
)
enough_existences:BEGIN
	DECLARE existences_left INTEGER;
	DECLARE product_name VARCHAR(100);

	SELECT p.existence - amount_in, p.name  INTO existences_left, product_name
	FROM products p 
	WHERE p.prod_id = prod_id_in;

	IF existences_left < 0 THEN
		SELECT CONCAT('El producto ', product_name, ' no tiene existencias suficientes') AS 'MESSAGE',
		'ERROR' AS 'TYPE';
	ELSE
		SELECT 'Existencias suficientes' AS 'MESSAGE',
		'SUCCESS' AS 'TYPE';
	END IF;
END $$


-- ########################################## PROCEDIMIENTO PARA AGREGAR UN PRODUCTO A UNA ORDEN ####################################################
CREATE PROCEDURE IF NOT EXISTS addProductToPurchase(
	IN purchase_id_in INTEGER,
	IN prod_id_in INTEGER,
	IN amount_in INTEGER
)
add_product_to_purchase:BEGIN
	DECLARE prod_price DECIMAL;

	IF NOT ProducIdExists(prod_id_in) THEN
		SELECT 'El producto que desea agregar no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_product_to_purchase;
	END IF;

	IF amount_in <= 0 THEN 
		SELECT 'La cantidad a comprar de un producto debe ser mayor a cero' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_product_to_purchase; 
	END IF;

	SELECT p.price INTO prod_price
	FROM products p 
	WHERE p.prod_id = prod_id_in;

	INSERT INTO purchase_details(purchase_id, prod_id, amount, total_price)
	VALUES(purchase_id_in, prod_id_in, amount_in, prod_price*amount_in);

	UPDATE products p
	SET p.existence = p.existence  - amount_in
	WHERE prod_id = prod_id_in;

	SELECT 'Producto agregado exitosamente a orden' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- ########################################## PROCEDIMIENTO PARA OBTENER LA LISTA DE COMPRAS DE UN CLIENTE EN ESPECIFICO #################################################### 
CREATE PROCEDURE IF NOT EXISTS getClientPurchases(
	IN dpi_in BIGINT
)
get_client_purchases:BEGIN
	SELECT p.purchase_id AS purchase_id,
	u.name AS name,
	u.dpi AS dpi,
	JSON_ARRAYAGG(
		JSON_OBJECT('name', p2.name, 'image', p2.photo, 'price', p2.price, 'amount', pd.amount)
	) AS products
	FROM purchases p
	JOIN purchase_details pd 
	ON pd.purchase_id = p.purchase_id 
	JOIN products p2
	ON p2.prod_id = pd.prod_id
	JOIN users u 
	ON u.dpi = p2.dpi 
	AND p.buyer = 53681241
	GROUP BY p.purchase_id, u.dpi;
END $$


-- ########################################## PROCEDIMIENTO PARA OBTENER LA LISTA DE VENTAS DE UN VENDEDOR EN ESPECÍFICO #################################################### 
CREATE PROCEDURE IF NOT EXISTS getSellerSales(
	IN dpi_in BIGINT
)
get_seller_sells:BEGIN
	SELECT p.prod_id AS id,
	p.photo AS image,
	p.name AS name,
	p.description AS description,
	pd.amount AS amount,
	pd.total_price AS total,
	p2.purchase_date AS date
	FROM purchase_details pd
	JOIN products p
	ON p.prod_id = pd.prod_id
	JOIN purchases p2
	ON p2.purchase_id = pd.purchase_id
	AND p.dpi = dpi_in;
END $$


-- ########################################## PROCEDIMIENTO PARA CALIFICAR UNA COMPRA EN CONCRETO #################################################### 
CREATE PROCEDURE IF NOT EXISTS ratePurchase(
	IN purchase_id_in INTEGER,
	IN seller_in BIGINT,
	IN score_in INTEGER
)
rate_purchase:BEGIN
	DECLARE avg_score DECIMAL;

	IF score_in < 0 THEN
		SELECT 'La nota debe ser un valor positivo' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE rate_purchase;
	END IF;	

	IF NOT UserExists(seller_in) THEN
		SELECT 'El usuario indicado no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE rate_purchase;
	END IF;

	UPDATE purchase_details pd
		JOIN products p
		ON p.prod_id = pd.prod_id 
	SET pd.score = score_in,
		pd.rated = TRUE
	WHERE pd.purchase_id = purchase_id_in
	AND p.dpi = seller_in;

	SELECT AVG(pd.score) INTO avg_score
	FROM purchase_details pd
	JOIN products p 
	ON p.prod_id = pd.prod_id 
	WHERE pd.rated 
	AND p.dpi = seller_in;

	UPDATE sellers s
	SET s.score = avg_score
	WHERE s.dpi = seller_in;

	SELECT 'Se ha calificado la compra exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- ########################################## PROCEDIMIENTO PARA OBTENER LOS PRODUCTOS MÁS VENDIDOS #################################################### 
CREATE PROCEDURE IF NOT EXISTS MostSelledProducts()
BEGIN
	SELECT p.prod_id AS product_id,
	p.name AS nombre,
	p.price AS precio,
	p.description AS descripcion,
	p.photo AS imagen,
	u.email AS email,
	u.name AS name,
	COUNT(*) AS "cantidad-vendidos"
	FROM purchase_details pd
	JOIN products p
	ON p.prod_id = pd.prod_id 
	JOIN users u 
	ON p.dpi = u.dpi 
	GROUP BY p.prod_id 
	ORDER BY "cantidad-vendidos" DESC;
END $$

CALL MostSelledProducts()
-- ########################################## PROCEDIMIENTO PARA OBTENER LOS PRODUCTOS MÁS VENDIDOS #################################################### 
CREATE PROCEDURE IF NOT EXISTS BestSellers()
BEGIN
	SELECT u.name AS name,
	u.email AS email,
	u.dpi  AS dpi,
	u.image AS image,
	u.state AS state,
	COUNT(*) AS "cantidad-ventas"
	FROM purchase_details pd
	JOIN products p
	ON p.prod_id = pd.prod_id 
	JOIN users u
	ON u.dpi = p.dpi 
	GROUP BY u.dpi
	ORDER BY "cantidad-ventas" DESC;
END $$


-- ########################################## PROCEDIMIENTO PARA OBTENER LAS CATEGORÍAS MÁS VENDIDAS #################################################### 
CREATE PROCEDURE IF NOT EXISTS MostSelledCategories()
BEGIN
	SELECT pc.prod_cat AS "nombre-categoria",
	COUNT(*) AS "cantidad-ventas"
	FROM purchase_details pd
	JOIN products p
	ON pd.prod_id = p.prod_id 
	JOIN prod_categories pc
	ON p.cat_id = pc.cat_id 
	GROUP BY pc.cat_id
	ORDER BY "cantidad-ventas" DESC;
END $$


-- ########################################## PROCEDIMIENTO PARA OBTENER LAS CATEGORÍAS MÁS VENDIDAS DE UN VENDEDOR EN CONCRETO #################################################### 
CREATE PROCEDURE IF NOT EXISTS MostSelledSCategories(
	IN dpi_in BIGINT
)
BEGIN
	SELECT pc.prod_cat AS "nombre-categoria",
	COUNT(*) AS "cantidad-ventas"
	FROM purchase_details pd
	JOIN products p
	ON pd.prod_id = p.prod_id 
	JOIN prod_categories pc
	ON p.cat_id = pc.cat_id 
	AND p.dpi = dpi_in
	GROUP BY pc.cat_id
	ORDER BY "cantidad-ventas" DESC;
END $$
SELECT * FROM prod_categories pc 
-- ########################################## PROCEDIMIENTO PARA OBTENER LOS PRODUCTOS MÁS VENDIDOS DE UN VENDEDOR EN CONCRETO #################################################### 
CREATE PROCEDURE IF NOT EXISTS MostSelledSProducts(
	IN dpi_in BIGINT
)
BEGIN
	SELECT p.prod_id AS product_id,
	p.name AS nombre,
	p.price AS precio,
	p.description AS descripcion,
	p.photo AS imagen,
	u.email AS email,
	u.name AS name,
	COUNT(*) AS "cantidad-vendidos"
	FROM purchase_details pd
	JOIN products p
	ON p.prod_id = pd.prod_id 
	JOIN users u 
	ON p.dpi = u.dpi 
	AND p.dpi = dpi_in
	GROUP BY p.prod_id 
	ORDER BY "cantidad-vendidos" DESC;
END $$


-- ########################################## PROCEDIMIENTO PARA AGREGAR UNA NUEVA ENTRADA A LA BITÁCORA #################################################### 
CREATE PROCEDURE IF NOT EXISTS AddToHistory(
	IN user_in VARCHAR(50),
	IN action_in VARCHAR(100),
	IN details_in VARCHAR(255)
)
BEGIN
	INSERT INTO history(user, action, details)
	VALUES (user_in, action_in, details_in);

	SELECT 'Nueva entrada agregada exitósamente a la bitácora' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- ########################################## PROCEDIMIENTO PARA OBTENER EL CONTENIDO DE LA BITÁCORA #################################################### 
CREATE PROCEDURE IF NOT EXISTS getHistory()
BEGIN
	SELECT h.hist_id AS ID,
	h.`date` AS Date,
	h.`user` AS User,
	h.`action` AS Action,
	h.details AS Details
	FROM history h;
END $$
