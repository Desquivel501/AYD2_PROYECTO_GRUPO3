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
	dpi_in BIGINT
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE user_exists BOOLEAN;
	SELECT EXISTS(SELECT 1 FROM users u WHERE u.dpi  = dpi_in) INTO user_exists;
	RETURN(user_exists);
END $$

-- ########################################## VERIFICAR SI UN CORREO EXISTE ####################################################
CREATE FUNCTION IF NOT EXISTS EmailExists(
	email_in VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE user_exists BOOLEAN;
	SELECT EXISTS(SELECT 1 FROM users u WHERE u.email  = email_in) INTO user_exists;
	RETURN(user_exists);
END $$

-- ########################################## VERIFICAR SI UN USUARIO TIENE UN ESTADO PENDIENTE ####################################################
CREATE FUNCTION IF NOT EXISTS StatePending(
	dpi_in BIGINT
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE pending BOOLEAN;

	SELECT u.state = 2 INTO pending
	FROM users u 
	WHERE u.dpi  = dpi_in;
	
	RETURN(pending);
END $$

-- ########################################## VERIFICAR SI UN USUARIO ES UN VENDEDOR ####################################################
CREATE FUNCTION IF NOT EXISTS IsSeller(
	dpi_in BIGINT
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE seller BOOLEAN;
	SELECT EXISTS(
		SELECT 1 FROM sellers s 
		WHERE s.dpi = dpi_in
	) INTO seller;
	
	RETURN(seller);
END $$

-- ########################################## VERIFICAR SI UNA CATEGORÍA EXISTE Y RETORNAR SU ID ####################################################
CREATE FUNCTION IF NOT EXISTS CategoryId(
	category_in VARCHAR(150)
)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	DECLARE category_id INTEGER;
	SELECT -999 INTO category_id;

	SELECT pc.cat_id INTO category_id
	FROM prod_categories pc 
	WHERE pc.prod_cat = category_in;

	RETURN(category_id);
END $$


-- ########################################## VERIFICAR SI UN VENDEDOR YA POSEE UN PRODUCTO ####################################################
CREATE FUNCTION IF NOT EXISTS ProductExists(
	prod_name VARCHAR(100),
	seller_dpi VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE prod_exists BOOLEAN;
	SELECT EXISTS(
		SELECT 1 
		FROM products p 
		WHERE p.name = prod_name
		AND p.dpi = seller_dpi
	) INTO prod_exists;

	RETURN(prod_exists);
END $$

-- ########################################## VERIFICAR SI UN PRODUCTO YA EXISTE POR MEDIO DE SU ID ####################################################
CREATE FUNCTION IF NOT EXISTS ProducIdExists(
	prod_id_in INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE prod_exists BOOLEAN;
	SELECT EXISTS(
		SELECT 1 
		FROM products p 
		WHERE p.prod_id = prod_id_in
	) INTO prod_exists;

	RETURN(prod_exists);
END $$

-- ########################################## FUNCIÓN PARA SABER SI UN USUARIO CUENTA CON UNA FORMA DE PAGO CONCRETA ####################################################
CREATE FUNCTION IF NOT EXISTS PaymentMethodExists(
	dpi_in BIGINT,
	payment_id_in INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE payment_exists BOOLEAN;
	SELECT EXISTS(
		SELECT 1
		FROM payment_methods pm 
		WHERE pm.payment_id = payment_id_in
		AND pm.dpi = dpi_in
	) INTO payment_exists;

	RETURN(payment_exists);
END $$

-- ########################################## FUNCIÓN PARA SABER SI UN CLIENTE YA POSEE UNA FORMA DE PAGO ####################################################
CREATE FUNCTION IF NOT EXISTS PaymentAliasExists(
	dpi_in BIGINT,
	alias_in VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE payment_exists BOOLEAN;
	SELECT EXISTS(
		SELECT 1
		FROM payment_methods pm 
		WHERE pm.alias = alias_in
		AND pm.dpi = dpi_in
	) INTO payment_exists;

	RETURN(payment_exists);
END $$