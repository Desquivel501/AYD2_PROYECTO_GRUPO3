# Pruebas de Aceptación - Funcionalidad de Vendedor: Editar Productos

[Regresar a Pruebas Funcionales](../test.md)

---

## Caso de Prueba 1: Eliminar Productos

#### Descripción
Este caso de prueba valida la capacidad del sistema para permitir al vendedor eliminar productos existentes del marketplace.

#### Pasos
1. El vendedor inicia sesión en la aplicación con sus credenciales de vendedor.
2. El vendedor accede a la sección de "Mis Productos" en la aplicación.
3. El vendedor selecciona el producto que desea eliminar.
4. El vendedor selecciona la opción para eliminar el producto.

#### Criterios de Aceptación
- El sistema debe permitir al vendedor eliminar un producto existente del marketplace.
- Después de eliminar el producto, este ya no debe aparecer en la lista de productos del vendedor ni en el marketplace para los usuarios finales.

#### Resultados Esperados
El producto seleccionado es eliminado correctamente del marketplace y ya no está disponible para su compra.

## Caso de Prueba 2: Editar Campos Concretos del Producto

#### Descripción
Este caso de prueba valida la capacidad del sistema para permitir al vendedor editar campos específicos de un producto existente en el marketplace.

#### Pasos
1. El vendedor inicia sesión en la aplicación con sus credenciales de vendedor.
2. El vendedor accede a la sección de "Mis Productos" en la aplicación.
3. El vendedor selecciona el producto que desea editar.
4. El vendedor modifica los campos específicos del producto que desea actualizar.
5. El vendedor confirma los cambios realizados.

#### Criterios de Aceptación
- El sistema debe permitir al vendedor editar campos específicos de un producto, como nombre, descripción, precio, etc.
- Después de confirmar los cambios, los datos del producto deben actualizarse correctamente en la base de datos y reflejarse en el marketplace.

#### Resultados Esperados
Los cambios realizados por el vendedor en los campos específicos del producto se reflejan correctamente en la interfaz del marketplace y en la base de datos.

---

[Regresar a Pruebas Funcionales](../test.md)