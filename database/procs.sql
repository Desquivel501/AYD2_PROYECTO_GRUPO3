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

