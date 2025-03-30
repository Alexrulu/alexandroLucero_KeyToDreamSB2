## No olvidar ejecutar `npm install`

KEYTODREAM, Una web sobre venta/alquiler de propiedades en Argentina, hecha por Lucero Alexandro.

### A tener en cuenta
- Para ver los cambios completos en responsive es necesario recargar la página, ya que se requiere una actualización de las funcionalidades y los estilos aplicados según el tamaño de pantalla.

### Algunas de las Funcionalidades
- Flujo de /register /login, publicar propiedades, guardar propiedades, etc.
- Vista para editar o eliminar propiedad publicada por el mismo usuario, vista para que el administrador de la web elimine propiedades o usuarios.
- Contraseñas seguras con bycript.
- Propiedades en el mapa.

### Para ver la interfaz del administrador:
- Correo: alexandro@gmail.com
- Contraseña: superAdmin123

### Cargar la estructura y datos de la Base de Datos
- Conectate a tu servidor en MySQL
- Dentro de MySQL, crea una nueva base de datos con el comando `CREATE DATABASE tunombrepreferido`, ejecutar
- Selecciona la nueva base de datos creada con `USE tunombrepreferido` o recargando la interfaz y doble click.
- Ve a File -> Open SQL Script... -> Selecciona el archivo keytodreamdb_backup.sql (se encuentra en la raiz del proyecto)
- Selecciona todo y ejecuta el comando con el rayo amarillo ⚡, o CTRL + ENTER
- Ahora nos vamos a vsc, una vez el proyecto haya sido clonado nos dirijimos a dos archivos, config.js y db.js, ambos dentro de src/database/config, cambiamos la linea de `"database": "keytodreamDB"` por `"database": "tunombrepreferido"` o el que hayamos definido.
- Listo, tu servidor debería estar correctamente conectado y listo para usarse.

### Configuración del entorno
- El archivo `.env.example` renómbralo como `.env`.
- Rellena las variables con tus propias credenciales (no modificar `NODE_ENV`).
- Guarda los cambios y ejecuta el proyecto.

Ejemplo de `.env`:
`SESSION_SECRET=miclave123`
`JWT_SECRET=miclave456`
`NODE_ENV=development`
`DB_PASSWORD=miclaveDB`

-------------------------------------

- Wireframe/Boceto: https://miro.com/app/board/uXjVL-TW2O0=/?share_link_id=576269415671
- Tablero de Trabajo: https://alexandro71000.atlassian.net/jira/software/projects/KAN/boards/1
- Sitio Web: https://alexandrolucerokeytodreamsb2-production.up.railway.app/ (en mantenimiento)