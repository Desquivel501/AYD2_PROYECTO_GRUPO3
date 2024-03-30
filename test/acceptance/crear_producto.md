# Pruebas de Aceptación - Funcionalidad de Crear Producto

[Regresar a Pruebas Funcionales](../test.md)

---

## Caso de Prueba 1: Validar que el Producto no Exista

#### Descripción
Este caso de prueba valida la capacidad del sistema para verificar si el producto que se está intentando crear no existe previamente en la base de datos.

#### Pasos
1. El usuario accede a la página de creación de productos en la aplicación.
2. El usuario ingresa los detalles del nuevo producto, como nombre, descripción, precio, etc.
3. El usuario intenta crear el producto.

#### Criterios de Aceptación
- El sistema debe verificar si ya existe un producto con el mismo nombre en la base de datos antes de crear uno nuevo.
- Si ya existe un producto con el mismo nombre, el sistema debe mostrar un mensaje de error indicando que el producto ya existe y no crear un nuevo registro.

#### Resultados Esperados
El sistema impide la creación de un producto si ya existe otro producto con el mismo nombre en la base de datos y muestra un mensaje de error apropiado al usuario.

---

[Regresar a Pruebas Funcionales](../test.md)