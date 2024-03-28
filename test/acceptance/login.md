# Pruebas de Aceptación - Funcionalidad Login

[Regresar a Pruebas Funcionales](../test.md)

---

## Caso de Prueba 1: Iniciar Sesión

#### Descripción
Este caso de prueba valida la capacidad del sistema para iniciar sesión de un usuario con credenciales válidas.

#### Pasos
1. El usuario ingresa su correo electrónico y contraseña en el formulario de inicio de sesión.
2. El usuario envía el formulario.

#### Criterios de Aceptación
- El sistema debe autenticar al usuario si las credenciales proporcionadas son válidas.
- Una vez autenticado, el usuario debe ser redirigido a la página principal o a la página que corresponda según el rol del usuario.

#### Resultados Esperados
El usuario inicia sesión correctamente y tiene acceso a las funcionalidades permitidas para su rol.

## Caso de Prueba 2: Validar Contraseña Incorrecta

#### Descripción
Este caso de prueba valida la capacidad del sistema para detectar y manejar contraseñas incorrectas durante el intento de inicio de sesión.

#### Pasos
1. El usuario ingresa su correo electrónico y una contraseña incorrecta en el formulario de inicio de sesión.
2. El usuario envía el formulario.

#### Criterios de Aceptación
- El sistema debe mostrar un mensaje de error indicando que la contraseña ingresada es incorrecta.
- El usuario no debe ser autenticado si la contraseña es incorrecta.

#### Resultados Esperados
El sistema muestra un mensaje de error apropiado y no permite el inicio de sesión con una contraseña incorrecta.

## Caso de Prueba 3: Validar Usuario Registrado

#### Descripción
Este caso de prueba valida la capacidad del sistema para verificar si un usuario está registrado en la base de datos durante el intento de inicio de sesión.

#### Pasos
1. El usuario ingresa su correo electrónico y una contraseña válida en el formulario de inicio de sesión.
2. El usuario envía el formulario.

#### Criterios de Aceptación
- El sistema debe verificar si el usuario está registrado en la base de datos.
- Si el usuario no está registrado, el sistema debe mostrar un mensaje de error indicando que el usuario no existe.

#### Resultados Esperados
El sistema muestra un mensaje de error apropiado si el usuario no está registrado en la base de datos.

## Caso de Prueba 4: Encriptar Contraseña

#### Descripción
Este caso de prueba valida la capacidad del sistema para encriptar la contraseña del usuario antes de almacenarla en la base de datos.

#### Pasos
El usuario ingresa su correo electrónico y una contraseña.
2. El sistema almacena la contraseña encriptada en la base de datos.

#### Criterios de Aceptación
- La contraseña del usuario debe ser encriptada antes de ser almacenada en la base de datos.
- Se debe utilizar un algoritmo de encriptación seguro y recomendado.

#### Resultados Esperados
La contraseña del usuario se almacena en la base de datos de forma encriptada y segura.

---

[Regresar a Pruebas Funcionales](../test.md)