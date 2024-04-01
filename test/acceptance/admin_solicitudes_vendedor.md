# Pruebas de Aceptación - Funcionalidad de Administrar Solicitudes de Vendedores (Administrador)

[Regresar a Pruebas Funcionales](../test.md)

---

## Caso de Prueba 1: Ver Datos de Solicitantes

#### Descripción
Este caso de prueba valida la capacidad del sistema para permitir al administrador ver los datos de los usuarios que han enviado solicitudes para convertirse en vendedores.

#### Pasos
1. El administrador inicia sesión en la aplicación con sus credenciales.
2. El administrador accede a la sección de administración de solicitudes de vendedores.

#### Criterios de Aceptación
- El sistema debe mostrar una lista de las solicitudes pendientes de los usuarios que desean convertirse en vendedores.
- Para cada solicitud, el sistema debe mostrar los datos relevantes del solicitante, como nombre, correo electrónico, información de contacto, etc.

#### Resultados Esperados
El administrador puede ver de manera precisa y detallada los datos de los solicitantes en la interfaz de administración.

## Caso de Prueba 2: Aceptar Solicitud

#### Descripción
Este caso de prueba valida la capacidad del sistema para permitir al administrador aceptar las solicitudes de los usuarios que desean convertirse en vendedores.

#### Pasos
1. El administrador inicia sesión en la aplicación con sus credenciales.
2. El administrador accede a la sección de administración de solicitudes de vendedores.
3. El administrador selecciona una solicitud pendiente.
4. El administrador selecciona la opción para aceptar la solicitud.

#### Criterios de Aceptación
- El sistema debe permitir al administrador aceptar una solicitud pendiente de un usuario para convertirse en vendedor.
- Después de aceptar la solicitud, el usuario debe ser registrado como vendedor en el sistema y recibir acceso a las funcionalidades de vendedor.

#### Resultados Esperados
La solicitud del usuario se marca como aceptada y el usuario es registrado como vendedor en el sistema.

## Caso de Prueba 3: Bloquear Solicitud

#### Descripción
Este caso de prueba valida la capacidad del sistema para permitir al administrador bloquear las solicitudes de los usuarios que desean convertirse en vendedores.

#### Pasos
1. El administrador inicia sesión en la aplicación con sus credenciales.
2. El administrador accede a la sección de administración de solicitudes de vendedores.
3. El administrador selecciona una solicitud pendiente.
4. El administrador selecciona la opción para bloquear la solicitud.

#### Criterios de Aceptación
- El sistema debe permitir al administrador bloquear una solicitud pendiente de un usuario para convertirse en vendedor.
- Después de bloquear la solicitud, el usuario debe recibir una notificación indicando que su solicitud ha sido rechazada.

#### Resultados Esperados
La solicitud del usuario se marca como bloqueada y el usuario recibe una notificación de rechazo de su solicitud.

---

[Regresar a Pruebas Funcionales](../test.md)