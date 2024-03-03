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

	IF number_in < 0 OR cvv_in < 0 THEN
		SELECT 'Los datos de la tarjeta no son válidos' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_payment_method;
	END IF;

	INSERT INTO payment_methods(cardholder_name, number, exp, cvv, dpi)
	VALUES (cardholder_in, number_in, exp_in, cvv_in, dpi_in);

	SELECT 'El método de pago ha sido agregado exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
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