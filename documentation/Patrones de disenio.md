# Patrones de diseño utilizados en el proyecto

En este proyecto, se han utilizado varios patrones de diseño para mejorar la estructura y la flexibilidad del código. A continuación, se explican los motivos por los que se ha utilizado el patrón Singleton, el patrón Visitor y el patrón Adapter.

## Patrón Singleton

El patrón Singleton se ha utilizado en este proyecto para garantizar que solo exista una instancia de una determinada clase en todo el sistema. Esto es especialmente útil cuando se necesita tener acceso global a un objeto único, como una configuración o una conexión a una base de datos.

Se decidio utilizar el patrón singleton a la hora de conectarse a la base de datos, de manera a que cada cliente mantenga su propia conexión abierta en lugar de crear una nueva conexión cada vez que se necesita información.

![singleton](/documentation/imagenes/singleton.jpg)

## Patrón Visitor

El patrón Visitor se ha utilizado en este proyecto para separar la lógica de procesamiento de datos de la estructura de los objetos que se procesan. Esto permite añadir nuevas operaciones o algoritmos sin modificar las clases existentes. El patrón Visitor se basa en la idea de que se pueden definir nuevas operaciones externas a las clases existentes, y estas operaciones pueden ser aplicadas a cualquier objeto que implemente una interfaz común.

En este proyecto, el patrón Visitor se ha utilizado para implementar diferentes metodos en la sección de productos, para crear una sola clase que permita crear, editar y eliminar productos.

![visitor](/documentation/imagenes/visitor.jpg)

## Patrón Adapter

El patrón Adapter se ha utilizado en este proyecto para permitir la interoperabilidad entre dos tipos de archivos incompatibles. En ocasiones, se pueden tener componentes que esperan una interfaz específica, pero se necesita utilizar otro componente que tiene una interfaz diferente. En lugar de modificar el código existente para que sea compatible con la nueva interfaz, se puede utilizar el patrón Adapter para crear un adaptador que actúe como un puente entre las dos interfaces.

En este proyecto, el patrón Adapter se ha utilizado para obtener la imagen en base64, subir esta imagen a S3 y obtener el URL de la imagen que esta esperando el backend

![adapter](/documentation/imagenes/adapter.jpg)
