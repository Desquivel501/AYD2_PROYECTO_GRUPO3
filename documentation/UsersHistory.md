# Historial de usuarios

## Funcionalidades de Alta Prioridad

### 1. Login

***Puntos de Historia***: 8

***Descripción:***
Como usuario, quiero poder iniciar sesión en la plataforma para acceder a mis datos y realizar acciones personalizadas.

***Tareas:***
- Implementar la funcionalidad para autenticar a los usuarios.
- Validar las credenciales proporcionadas por el usuario y generar un token de acceso.
- Manejar correctamente los errores de autenticación y enviar respuestas apropiadas.

### 2. Obtener Perfil de Usuario

***Puntos de Historia:*** 7

***Descripción:***
Como usuario, quiero poder ver mi perfil en la plataforma para revisar y actualizar mis datos personales.

***Tareas:***
- Implementar la funcionalidad para obtener los detalles del perfil de un usuario específico.
- Garantizar que solo el usuario autenticado pueda acceder a su propio perfil.
- Incluir información relevante como nombre, correo electrónico, dirección, etc.

### 3. Registrar Usuario

***Puntos de Historia:*** 6

***Descripción:***
Como usuario nuevo, quiero poder registrarme en la plataforma para crear una cuenta y comenzar a usarla.

***Tareas:***
- Implementar la funcionalidad para permitir que los usuarios se registren proporcionando información básica.
- Validar los datos del usuario durante el proceso de registro para garantizar su integridad.
- Almacenar de forma segura las credenciales del usuario en la base de datos.

### 4 Actualizar Perfil de Usuario

***Puntos de Historia:*** 6
***Descripción:***
Como usuario, quiero poder actualizar mi perfil en la plataforma para mantener mi información actualizada.

***Tareas:***
- Implementar la funcionalidad para permitir la actualización de los datos del usuario.
- Validar los datos actualizados para garantizar su corrección y coherencia.
- Manejar adecuadamente los errores y enviar respuestas apropiadas.

### 5. Obtener Todos los Usuarios

***Puntos de Historia:*** 5
***Descripción:***
Como administrador, quiero poder ver una lista de todos los usuarios registrados en la plataforma para gestionarlos adecuadamente.

***Tareas:***
- Implementar la funcionalidad para obtener una lista de todos los usuarios registrados.
- Asegurar que solo los administradores puedan acceder a esta funcionalidad.
- Incluir información básica de los usuarios como nombre, correo electrónico, estado de activación, etc.

---

## Funcionalidades de Prioridad Media

### 6. Aceptar Vendedor

***Puntos de Historia:*** 4

***Descripción:***
Como administrador, quiero poder aceptar la solicitud de un vendedor para que pueda comenzar a listar productos en el marketplace.

***Tareas:***
- Implementar la funcionalidad para aceptar la solicitud de un vendedor.
- Actualizar el estado del vendedor en la base de datos para reflejar su aceptación.
- Enviar una notificación al vendedor para informarle que su solicitud ha sido aceptada.

### 7. Agregar Métodos de Pago
***Puntos de Historia:*** 4

***Descripción:***
Como usuario, quiero poder agregar métodos de pago a mi perfil para realizar compras de forma conveniente.

***Tareas:***
- Implementar la funcionalidad para permitir a los usuarios agregar nuevos métodos de pago.
- Validar los datos del método de pago, como número de tarjeta, fecha de vencimiento, etc.
- Almacenar de forma segura la información del método de pago asociada al usuario.

### 8. Agregar Categoría de Producto

***Puntos de Historia:*** 4

***Descripción:***
Como administrador, quiero poder agregar nuevas categorías de productos al marketplace para organizar los listados de productos.

***Tareas:***
- Implementar la funcionalidad para permitir la creación de nuevas categorías.

- Validar los datos de la categoría, como nombre, descripción, etc.
- Almacenar las categorías en la base de datos y asociarlas adecuadamente con los productos.

### 9. Agregar Producto

***Puntos de Historia:*** 4

***Descripción:***
Como vendedor, quiero poder agregar nuevos productos al marketplace para ponerlos a la venta.

***Tareas:***
- Implementar la funcionalidad para permitir la creación de nuevos productos.
- Validar los datos del producto, como nombre, descripción, precio, etc.
- Asociar el producto al vendedor que lo está agregando y asignarle una categoría si es necesario.

### 10. Crear Cupón

***Puntos de Historia:*** 4

***Descripción:***
Como administrador, quiero poder crear cupones de descuento para promocionar productos en el marketplace.

***Tareas:***
- Implementar la funcionalidad para permitir la creación de nuevos cupones.
- Definir el tipo de descuento, el valor, la fecha de vencimiento y otras características del cupón.
- Validar los datos del cupón y almacenarlos en la base de datos para su posterior uso.

### 11. Rechazar Vendedor

***Puntos de Historia:*** 4

***Descripción:***
Como administrador, quiero poder rechazar la solicitud de un vendedor si no cumple con los requisitos necesarios para ser aceptado.

***Tareas:***
- Implementar la funcionalidad para rechazar la solicitud de un vendedor.

- Actualizar el estado del vendedor en la base de datos para reflejar su rechazo.
- Enviar una notificación al vendedor para informarle que su solicitud ha sido rechazada.

### 12. Eliminar Producto

***Puntos de Historia:*** 4

***Descripción:***
Como vendedor, quiero poder eliminar un producto que ya no deseo vender en el marketplace.

***Tareas:***
- Implementar la funcionalidad para eliminar un producto existente.
- Validar que el producto pertenezca al vendedor autenticado y que tenga los permisos necesarios.
- Eliminar el producto de la base de datos y enviar una respuesta apropiada al cliente.

### 13. Deshabilitar Usuario

***Puntos de Historia:*** 4

***Descripción:***
Como administrador, quiero poder deshabilitar la cuenta de un usuario si infringe las políticas del sitio o realiza actividades fraudulentas.

***Tareas:***
- Implementar la funcionalidad para deshabilitar la cuenta de un usuario.
- Actualizar el estado del usuario en la base de datos para reflejar su deshabilitación.
- Notificar al usuario sobre la deshabilitación de su cuenta y los pasos necesarios para resolver la situación.

### 14. Habilitar Usuario

***Puntos de Historia:*** 4

***Descripción:***
Como administrador, quiero poder habilitar la cuenta de un usuario previamente deshabilitada para permitirle volver a acceder al sitio.

***Tareas:***
- Implementar la funcionalidad para habilitar la cuenta de un usuario deshabilitado.
- Actualizar el estado del usuario en la base de datos para reflejar su habilitación.
- Notificar al usuario sobre la reactivación de su cuenta y los pasos a seguir.

### 15. Obtener Todos los Productos

***Puntos de Historia:*** 4

***Descripción:***
Como usuario, quiero poder ver una lista de todos los productos disponibles en el marketplace para explorar y buscar productos de mi interés.

***Tareas:***
- Implementar la funcionalidad para obtener una lista paginada de todos los productos.

- Permitir consultas de búsqueda opcionales para filtrar productos por nombre, categoría, precio, etc.
- Realizar pruebas de rendimiento para garantizar una respuesta rápida incluso con grandes conjuntos de datos.

### 16. Obtener Todos los Usuarios Deshabilitados

***Puntos de Historia:*** 4

***Descripción:***
Como administrador, quiero poder ver una lista de todos los usuarios cuyas cuentas están deshabilitadas para gestionarlos adecuadamente.

***Tareas:***
- Implementar la funcionalidad para obtener una lista de usuarios deshabilitados.
- Asegurar que solo los administradores puedan acceder a esta funcionalidad.
- Incluir información básica de los usuarios deshabilitados para su revisión y gestión.

### 17. Obtener Todos los Usuarios Habilitados

***Puntos de Historia:*** 4

***Descripción:***
Como administrador, quiero poder ver una lista de todos los usuarios cuyas cuentas están habilitadas para gestionarlos adecuadamente.

***Tareas:***
- Implementar la funcionalidad para obtener una lista de usuarios habilitados.
- Asegurar que solo los administradores puedan acceder a esta funcionalidad.
- Incluir información básica de los usuarios habilitados para su revisión y gestión.

### 18. Obtener Vendedores Pendiente de Aceptación

***Puntos de Historia:*** 4

***Descripción:***
Como administrador, quiero poder ver una lista de todos los vendedores que están pendientes de aceptación para revisar sus solicitudes.

***Tareas:***
- Implementar la funcionalidad para obtener una lista de vendedores pendientes de aceptación.
- Asegurar que solo los administradores puedan acceder a esta funcionalidad.
- Incluir información básica de los vendedores para su revisión y gestión.

### 19. Obtener Categoría de Productos

***Puntos de Historia:*** 4

***Descripción:***
Como usuario, quiero poder ver una lista de todas las categorías de productos disponibles en el marketplace para explorar y buscar productos de una categoría específica.

***Tareas:***
- Implementar la funcionalidad para obtener una lista de todas las categorías de productos.
- Permitir consultas de búsqueda opcionales para filtrar categorías por nombre, descripción, etc.
- Garantizar que las categorías estén actualizadas y sean coherentes con los productos listados.

### 20. Obtener Producto

***Puntos de Historia:*** 4

***Descripción:***
Como usuario, quiero poder ver los detalles de un producto específico para obtener más información antes de realizar una compra.

***Tareas:***
- Implementar la funcionalidad para obtener los detalles de un producto específico.
- Incluir información detallada como nombre, descripción, precio, categoría, etc.
- Garantizar que solo los usuarios autenticados puedan acceder a esta funcionalidad.

### 21. Obtener Perfil de Vendedor

***Puntos de Historia:*** 4

***Descripción:***
Como usuario, quiero poder ver el perfil de un vendedor para conocer más sobre su reputación y los productos que ofrece.

***Tareas:***
- Implementar la funcionalidad para obtener los detalles del perfil de un vendedor específico.
- Incluir información relevante como nombre, ubicación, productos vendidos, calificaciones, etc.
- Garantizar que los detalles del vendedor estén actualizados y sean precisos.

### 22. Obtener Productos de Vendedor

***Puntos de Historia:*** 4

***Descripción:***
Como usuario, quiero poder ver una lista de todos los productos ofrecidos por un vendedor específico para explorar su catálogo.

***Tareas:***
- Implementar la funcionalidad para obtener una lista de productos de un vendedor.

- Incluir información básica de los productos como nombre, precio, categoría, etc.
- Garantizar que solo los usuarios autenticados puedan acceder a esta funcionalidad.

### 23. Actualizar Producto

***Puntos de Historia:*** 4

***Descripción:***
Como vendedor, quiero poder actualizar la información de un producto existente en el marketplace para corregir errores o actualizar detalles.

***Tareas:***
- Implementar la funcionalidad que permita actualizar la información de un producto específico.

- Validar que el producto exista y que el usuario tenga los permisos adecuados para editarlo.
- Manejar correctamente las actualizaciones parciales y completas de los datos del producto.

---