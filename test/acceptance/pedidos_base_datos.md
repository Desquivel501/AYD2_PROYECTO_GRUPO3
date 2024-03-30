# Pruebas de Aceptación - Pedidos en Base de Datos

[Regresar a Pruebas Funcionales](../test.md)

---

## Caso de Prueba 1: Creación de Pedido

#### Descripción
Este caso de prueba valida la capacidad del sistema para crear un nuevo pedido en la base de datos.

#### Pasos
1. El usuario inicia sesión en la aplicación.
2. El usuario navega a la sección de pedidos.
3. El usuario selecciona la opción para crear un nuevo pedido.
4. El usuario completa la información requerida para el nuevo pedido (productos, dirección de entrega, etc.).
5. El usuario confirma y envía el pedido.

#### Criterios de Aceptación
- Se debe crear un registro del pedido en la base de datos.
- Todos los detalles proporcionados por el usuario deben ser almacenados correctamente.

#### Resultados Esperados
El nuevo pedido debe estar visible en la lista de pedidos del usuario.

## Caso de Prueba 2: Listar Pedidos

#### Descripción
Este caso de prueba valida la capacidad del sistema para listar los pedidos almacenados en la base de datos.

#### Pasos
1. El usuario inicia sesión en la aplicación.
2. El usuario navega a la sección de pedidos.

#### Criterios de Aceptación
- Se deben mostrar todos los pedidos del usuario.
- La información de cada pedido (productos, estado, fecha, etc.) debe ser precisa y actualizada.

#### Resultados Esperados
Se muestran correctamente todos los pedidos del usuario en la interfaz de la aplicación.

## Caso de Prueba 3: Calificar Pedido

#### Descripción
Este caso de prueba valida la capacidad del sistema para que el usuario califique un pedido después de recibirlo.

#### Pasos
1. El usuario inicia sesión en la aplicación.
2. El usuario navega a la sección de pedidos.
3. El usuario selecciona el pedido que desea calificar.
4. El usuario proporciona una calificación y opcionalmente deja un comentario.
5. El usuario confirma la calificación.

#### Criterios de Aceptación
- La calificación y comentario del usuario deben ser registrados en la base de datos y asociados al pedido correspondiente.

#### Resultados Esperados
La calificación y comentario del usuario se reflejan correctamente en el pedido correspondiente.

## Caso de Prueba 4: Agregar Producto a Pedido

#### Descripción
Este caso de prueba valida la capacidad del sistema para que el usuario agregue un producto a un pedido existente.

#### Pasos
1. El usuario inicia sesión en la aplicación.
2. El usuario navega a la sección de pedidos.
3. El usuario selecciona el pedido al que desea agregar un producto.
4. El usuario selecciona la opción para agregar un producto adicional.
5. El usuario selecciona el producto deseado y especifica la cantidad.
6. El usuario confirma la adición del producto al pedido.

#### Criterios de Aceptación
- El producto seleccionado debe ser agregado al pedido existente en la base de datos.
- La cantidad del producto agregado debe ser la especificada por el usuario.

#### Resultados Esperados
El producto seleccionado se agrega correctamente al pedido existente y la cantidad es la deseada por el usuario.

---

[Regresar a Pruebas Funcionales](../test.md)