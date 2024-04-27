# Pruebas de Regresion - Funcionalidad de Administrador

## Registro de solicitudes HTTP al backend

Los administradores del sistema ahora pueden acceder a un registro de todas las solicitudes HTTP al backend.

### Componentes afectados:

- Servidor backend

### Validaciones:

- Verificar que los administradores de sistemas puedan acceder al registro de solicitudes HTTP de forma segura y sin acceso no autorizado.
- Asegúrese de que el registro capture todos los detalles relevantes de las solicitudes HTTP, incluidas marcas de tiempo, métodos de solicitud, puntos finales y cualquier dato asociado.
- Validar la exactitud e integridad de la información registrada frente al tráfico HTTP real.
- Probar cualquier sobrecarga de rendimiento introducida al registrar solicitudes HTTP, especialmente en condiciones de mucho tráfico.
