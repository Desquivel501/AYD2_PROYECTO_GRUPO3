# Pruebas de Aceptación - Funcionalidad de Recuperación de Contraseña

[Regresar a Pruebas Funcionales](../test.md)

---

## Caso de Prueba 1: Enviar Código por Correo

#### Descripción
Este caso de prueba valida la capacidad del sistema para enviar un código de recuperación de contraseña al correo electrónico del usuario.

#### Pasos
1. El usuario solicita la recuperación de contraseña desde la interfaz de la aplicación.
2. El sistema genera un código de recuperación único y lo envía al correo electrónico asociado a la cuenta del usuario.

#### Criterios de Aceptación
- El sistema debe enviar el código de recuperación de contraseña al correo electrónico del usuario.
- El código de recuperación debe ser único y válido durante un tiempo determinado.

#### Resultados Esperados
El usuario recibe el código de recuperación de contraseña en su correo electrónico.

## Caso de Prueba 2: Validar Código Correcto

#### Descripción
Este caso de prueba valida la capacidad del sistema para verificar si el código de recuperación ingresado por el usuario es el correcto.

#### Pasos
1. El usuario recibe el código de recuperación de contraseña en su correo electrónico.
2. El usuario ingresa el código de recuperación en el formulario de recuperación de contraseña.
3. El usuario envía el formulario.

#### Criterios de Aceptación
- El sistema debe validar si el código de recuperación ingresado por el usuario es el mismo que el código enviado por correo.
- El sistema debe permitir al usuario continuar con el proceso de recuperación si el código es correcto.

#### Resultados Esperados
El sistema valida el código de recuperación correctamente y permite al usuario continuar con el proceso de recuperación de contraseña.

## Caso de Prueba 3: Vista de Recuperación de Contraseña

#### Descripción
Este caso de prueba valida la capacidad del sistema para mostrar una interfaz de usuario adecuada para el proceso de recuperación de contraseña.

#### Pasos
1. El usuario accede a la página de recuperación de contraseña desde la interfaz de la aplicación.
   
#### Criterios de Aceptación
- La interfaz de usuario de la página de recuperación de contraseña debe ser clara y fácil de entender.
- Debe haber un campo para ingresar el código de recuperación y un campo para ingresar la nueva contraseña.

#### Resultados Esperados
El usuario puede acceder a la página de recuperación de contraseña y encontrar fácilmente los campos necesarios para continuar con el proceso de recuperación.

---

[Regresar a Pruebas Funcionales](../test.md)
