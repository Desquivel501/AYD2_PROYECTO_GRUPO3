DELIMITER $$

USE proyecto $$

-- ########################################## VERIFICAR SI UN CORREO TIENE EL FORMATO CORRECTO ####################################################
CREATE FUNCTION IF NOT EXISTS ValidEmail(
	email_in VARCHAR(200)
) 
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE valid BOOLEAN;
	IF(SELECT REGEXP_LIKE(email_in, '^[[:alnum:]-\\.]+@([[:alnum:]-]+\\.)+[[:alnum:]-]{2,4}$') = 1) THEN
		SELECT TRUE INTO valid;
	ELSE
		SELECT FALSE INTO valid;
	END IF;
	RETURN(valid);
END $$

-- ########################################## VERIFICAR SI UN USUARIO EXISTE ####################################################
CREATE FUNCTION IF NOT EXISTS UserExists(
	email_in VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE user_exists BOOLEAN;
	SELECT EXISTS(SELECT 1 FROM users u WHERE u.email = email_in) INTO user_exists;
	RETURN(user_exists);
END $$

-- ########################################## VERIFICAR SI UN USUARIO TIENE UN ESTADO PENDIENTE ####################################################
CREATE FUNCTION IF NOT EXISTS StatePending(
	email_in VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE pending BOOLEAN;

	SELECT u.state = 2 INTO pending
	FROM users u 
	WHERE u.email  = email_in;
	
	RETURN(pending);
END $$

-- ########################################## VERIFICAR SI UN USUARIO ES UN VENDEDOR ####################################################
CREATE FUNCTION IF NOT EXISTS IsSeller(
	email_in VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE seller BOOLEAN;
	SELECT EXISTS(
		SELECT 1 FROM sellers s 
		WHERE s.email = email_in
	) INTO seller;
	
	RETURN(seller);
END




