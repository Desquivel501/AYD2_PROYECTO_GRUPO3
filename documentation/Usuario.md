# Manual de usuario

## 1. Inicio de sesión y registro

Al momento de entrar a la aplicación se podrá visualizar una vista con el siguiente aspecto, en esta se podrá iniciar sesión por medio de un correo y la contraseña asociada a ese correo. Posteriormente se deberá oprimir **Log in** para ingresar a las funcionalidades de la aplicación.
![Login](/documentation/imagenes/login1.jpg)

Esto solo está disponible para personas que se encuentre registradas en la plataforma, por lo que se facilitará un hipervínculo cuyo texto será **Registrate** el cual, al oprimirlo, redireccionará al usuario a la vista que le permitirá registrarse en la aplicación.
![Login](/documentation/imagenes/login2.jpg)

Finalmente se tendrá otro hipervínculo, el cual permitirá a las personas que olvidaron su contraseña el recuperarla por medio de un correo de recuperación que será enviado a su correo registrado.
![Login](/documentation/imagenes/login3.jpg)

## 2. Registro

En la aplicación existen dos tipos de registros, un registro para los usuarios que desean realizar compras en la aplicación y un registro para los que desean también ser vendedores. Para ambos registros se solicitan los mismos datos, sin embargo por esto mismo si ya se creó una cuenta con una dirección de correo como cliente, entonces se necesitará otra dirección de correo para una cuenta de vendedor. Para las cuentas de vendedor se necesita que el administrador autorice o deniegue la creación de la misma por lo que aunque un usuario de este tipo se registre, no podrá iniciar sesión hasta que un administrador lo apruebe.

### 2.1 Registro como cliente

![Registro](/documentation/imagenes/registro1.png)

### 2.2 Registro como vendedor

![Registro](/documentation/imagenes/registro2.png)

## 3. Usuario cliente

Al momento de iniciar sesión como un cliente, se poseerá una barra de navegación en la parte superior de la pantalla, en esta pantalla se dispondrá de varias funcionalidades distintas: **Catalogo**, **Mis pedidos**.
Además de esto se pueden visualizar funcionalidades comunes para todos los tipos de usuarios como: **Mi perfil** y **Cerrar sesión**.

![Usuario](/documentation/imagenes/usuario1.png)

### 3.1 Catálogo

Cuando se selecciona la opción de catálogo, se despliega un listado de todos los productos que se encuentran disponibles para comprar en la aplicación. Además en el lado derecho de la vista se puede observar un conjunto de filtros que se pueden aplicar a los productos, para poder optimizar la búsqueda de alguno en concreto.

Los filtros disponibles para los productos son:

* Precio
* Categoría
* Búsqueda de un producto por nombre

![Usuario](/documentation/imagenes/usuario2.png)

### 3.2 Visualización de producto

Cuando se oprime algún producto en concreto se puede ingresar a una vista más detallada del mismo, en esta vista se puede observar distintos tipos de detalles de un producto en concreto como:

* Nombre
* Descripción
* Precio
* Disponibilidad
* Vendedor
* Productos relacionados

![Usuario](/documentation/imagenes/usuario3.png)

## 4. Usuario vendedor

Al ingresar por medio de un usuario de tipo vendedor, se podrá visualizar una pantalla como la siguiente:

![Vendedor](/documentation/imagenes/vendedor.png)

En esta pantalla se dispondrá de distintas funcionalidades únicas del usuario vendedor.

![Vendedor](/documentation/imagenes/vendedor1.png)

Aunque las funcionalidades **Catálogo** y **Mis pedidos** posean el mismo nombre que las funcionalidades disponibles en el usuario de tipo cliente, su uso es totalmente diferente y se describirá a continuación.

### 4.1 Catálogo

En el caso del catálogo, se desplegará un listado de todos los productos que en usuario vendedor que se encuentra autenticado tenga en venta, además, se le proveerá de un apartado que podrá presionar para poder crear un nuevo producto.

![Vendedor](/documentation/imagenes/vendedor2.png)

Los filtros que posee para optimizar la búsqueda de los productos que el pueda poseer son los mismos que los de un usuario de tipo cliente, es decir:

* Precio
* Categoría
* Búsqueda de un producto por nombre

### 4.2 Crear producto

Al seleccionar la opción de **Crear producto** anteriormente descrita, se desplegará una vista como la que a continuación se muestra:

![Vendedor](/documentation/imagenes/vendedor3.png)

En esta vista se dispondrá de un conjunto de campos donde se deberán ingresar datos acerca del producto que se desea crear y de un par de botones.
El primero es un botón azul que posee el texto **Subir imagen**, al momento de oprimirlo se desplegará una ventana del explorador de archivos, donde se deberá seleccionar una imagen representativa del producto que se desea crear. Se desplegará una vista previa de la imagen (ajustada a las dimensiones 800x800).

![Vendedor](/documentation/imagenes/vendedor4.png)

Posteriormente se deberán ingresar datos como el nombre del producto, sus existencias (cantidad de unidades que se poseen del producto en venta), su precio en quetzales y una pequeña descripción del mismo. Al finalizar de ingresar todos estos datos se oprimirá el botón verde que indica **Guardar Cambios** para crear el producto.

![Vendedor](/documentation/imagenes/vendedor5.png)

### 4.3 Editar producto

Al momento de oprimir sobre cualquier producto creado, se podrá visualizar de forma más detallada su información.

![Vendedor](/documentation/imagenes/vendedor6.png)

Dentro de esta vista se podrán realizar distintas acciones en el producto como el modificar la imagen. Esto se realizará de la misma forma que al momento de crear un producto, se oprimirá el botón azul que indica **Subir imagen** y se seleccionará una imagen del explorador de archivos. Posteriormente se mostrará una pre visualización de la imagen.

![Vendedor](/documentation/imagenes/vendedor7.png)

También se podrá editar los datos del producto (nombre, existencias, precio y descripción) y guardar estos cambios presionando el botón verde.

![Vendedor](/documentation/imagenes/vendedor8.png)

A su vez se podrá eliminar el producto presionando el botón rojo que indica **Eliminar producto**.

![Vendedor](/documentation/imagenes/vendedor9.png)

## 5. Usuario administrador

Finalmente, un usuario administrador posee un menú como el siguiente:

![Administrador](/documentation/imagenes/admin.png)

Un usuario administrador posee una serie de herramientas que le permiten la gestión de los usuarios de tipo cliente y vendedor. Además se le provee de una serie de reportes que permiten conocer el desempeño de los vendedores y las tendencias de los compradores dentro de la aplicación.

![Administrador](/documentation/imagenes/admin1.png)

### 5.1 Solicitudes

Al momento de seleccionar esta opción, se desplegará al administrador una lista de todos los vendedores que han creado cuenta en la aplicación recientemente (y que necesitan confirmación para iniciar sesión). El administrador será capaz de aceptarlos, lo cual les proveerá acceso a la aplicación; o de rechazarlos, lo cual los eliminará de la base de datos.

### 5.2 Gestionar usuarios

En esta vista se desplegará al administrador dos listas diferentes listas, la primera será una lista con los usuarios que se encuentren habilitados (es decir, que tengan acceso normal a la plataforma). Sin embargo, para controlar el comportamiento dentro de la plataforma se pueden deshabilitar usuarios.

![Administrador](/documentation/imagenes/admin2.png)

Los usuarios deshabilitados estarán en la lista inferior, sin embargo, estos podrán ser habilitados nuevamente.

![Administrador](/documentation/imagenes/admin3.png)

### 5.3 Gestionar vendedores

Al igual que con los usuarios, el administrador podrá habilitar y deshabilitar vendedores. Los vendedores habilitados se mostrarán en la lista superior de la vista y podrán ser deshabilitados en cualquier momento.

![Administrador](/documentation/imagenes/admin4.png)

Los vendedores deshabilitados se mostrarán en la lista superior y poseerán una opción para habilitarlos.

![Administrador](/documentation/imagenes/admin5.png)

## 6 Editar perfil

Esta es una funcionalidad común de todos los usuarios que se encuentran en la plataforma, al momento de oprimir esta funcionalidad en la barra de navegación se desplegará una vista con la siguiente información:

![Perfil](/documentation/imagenes/perfil.png)

Dentro de esta vista, además de ver los datos de usuario, se podrá gestionar los mismos. Al momento de presionar el botón azul con el texto **Cambiar** se podrá seleccionar una nueva imagen desde el explorador de archivos para que esta sea la nueva imagen de perfil.

![Perfil](/documentation/imagenes/perfil1.png)

Además de gestionar la imagen, se podrá editar la demás información del usuaro (como correo, nombre, etc.) escribiendo su nuevo valor en los campos de texto donde se muestran los datos actuales. Finalmente para guardar los cambios se oprimirá el botón verde que indica **Actualizar datos**.

![Perfil](/documentation/imagenes/perfil2.png)