DELIMITER $$

USE proyecto $$

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

	IF UserExists(email_in) THEN
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

	INSERT INTO users(email, name, password, dpi, role, state, image)
	VALUES (email_in, name_in, password_in, dpi_in, role_in, role_in, image_in);
	
	IF role_in = 1 THEN
		INSERT INTO clients(email)
		VALUES (email_in);
	ELSE 
		INSERT INTO sellers(email)
		VALUES (email_in);
	END IF;

	SELECT 'El usuario ha sido registrado exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- ########################################## PROCEDIMIENTO PARA ACEPTAR LA CUENTA DE UN VENDEDOR ####################################################
CREATE PROCEDURE IF NOT EXISTS AcceptSeller(
	IN email_in VARCHAR(200)
)
accept_seller:BEGIN
	
	IF(NOT UserExists(email_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE accept_seller;
	END IF;

	IF(NOT StatePending(email_in)) THEN
		SELECT 'El usuario que se intenta aceptar no tiene estado pendiente' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE accept_seller;
	END IF;

	IF(NOT IsSeller(email_in)) THEN
		SELECT 'El correo ingresado no pertenece a un vendedor' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE accept_seller;	
	END IF;

	UPDATE users s
	SET s.state = 1
	WHERE s.email = email_in;

	SELECT 'La cuenta fue aceptada correctamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- ########################################## PROCEDIMIENTO PARA VER EL PERFIL DE UN USUARIO ####################################################
CREATE PROCEDURE IF NOT EXISTS getProfile(
	IN email_in VARCHAR(200)
)
get_profile:BEGIN
	
	IF(NOT UserExists(email_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE get_profile;
	END IF;

	SELECT u.email,
	u.name ,
	u.dpi,
	u.image 
	FROM users u 
	WHERE u.email  = email_in;
END $$


-- ########################################## PROCEDIMIENTO PARA VER EL PERFIL DE UN VENDEDOR ####################################################
CREATE PROCEDURE IF NOT EXISTS getSellerProfile(
	IN email_in VARCHAR(200)
)
get_seller_profile:BEGIN
	
	IF(NOT UserExists(email_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE get_seller_profile;
	END IF;
	
	IF(NOT IsSeller(email_in)) THEN
		SELECT 'El correo ingresado no pertenece a un vendedor' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE get_seller_profile;	
	END IF;

	SELECT u.email,
	u.name,
	u.dpi,
	u.image,
	s.score 
	FROM users u 
	JOIN sellers s 
	ON u.email = s.email 
	AND u.email = email_in;
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
	
	IF NOT ValidEmail(email_in) THEN
		SELECT 'El correo que ha ingresado no tiene un formato válido' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_profile;
	END IF;

	IF name_in = '' OR name_in IS NULL THEN 
		SELECT 'Los nombres no pueden estar en blanco' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_profile;
	END IF;

	IF image_in = '' OR image_in IS NULL THEN 
		SELECT u.image INTO image_in
		FROM users u 
		WHERE u.email = email_in;
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
	WHERE u.email = email_in;

	SELECT 'Los datos han sido actualizados exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- ########################################## PROCEDIMIENTO PARA DESHABILITAR UN USUARIO ####################################################
CREATE PROCEDURE IF NOT EXISTS DisableUser(
	IN email_in VARCHAR(200)
)
disable_user:BEGIN
	
	IF(NOT UserExists(email_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE disable_user;
	END IF;

	UPDATE users u 
	SET u.state = 0
	WHERE u.email = email_in;

	SELECT 'El usuario ha sido deshabilitado exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- ########################################## PROCEDIMIENTO PARA HABILITAR UN USUARIO ####################################################
CREATE PROCEDURE IF NOT EXISTS EnableUser(
	IN email_in VARCHAR(200)
)
enable_user:BEGIN
	
	IF(NOT UserExists(email_in)) THEN
		SELECT 'El correo ingresado no está registrado en la base de datos' AS 'MENSAJE',
        'ERROR' AS 'TIPO';
        LEAVE enable_user;
	END IF;

	UPDATE users u 
	SET u.state = 1
	WHERE u.email = email_in;

	SELECT 'El usuario ha sido habilitado exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- ########################################## PROCEDIMIENTO PARA AGREGAR UN CUPÓN A UN USUARIO ####################################################
CREATE PROCEDURE IF NOT EXISTS CreateCoupon(
	IN email_in VARCHAR(200),
	IN name_in VARCHAR(200),
	IN discount_in DECIMAL
)
create_coupon:BEGIN

	IF(NOT UserExists(email_in)) THEN
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

	INSERT INTO coupons(name, discount, used, email)
	VALUES (name_in, discount_in, FALSE, email_in);
	
	SELECT 'Cupón asignado exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';

END $$


