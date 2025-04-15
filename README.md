# Qik Challenge - Microservicios

Este proyecto consiste en tres microservicios construidos con NestJS:
- ms-drivers
- ms-rides
- ms-passangers

## Requisitos Previos

- Node.js (v20 o superior)
- MongoDB
- npm o yarn

## Configuración

1. Clonar el repositorio
2. Instalar dependencias para cada microservicio
3. Configurar las variables de entorno

## Ejecución de los Microservicios

### ms-rides

```bash
# Navegar al microservicio de rides
cd ms-rides

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run start:dev

# Ejecutar seeders
npx nestjs-command seed:rides
```

### ms-passangers

```bash
# Navegar al microservicio de pasajeros
cd ms-passangers

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run start:dev

# Ejecutar seeders
npx nestjs-command seed:passangers
```

### ms-drivers

```bash
# Navegar al microservicio de conductores
cd ms-drivers

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run start:dev

# Ejecutar seeders
npx nestjs-command seed:drivers
```

## Variables de Entorno

Cada microservicio requiere un archivo `.env` con las siguientes variables:

```env
MONGODB_URI=mongodb://localhost:27017/nombre-de-tu-base-de-datos
PORT=3000  # o cualquier otro puerto que prefieras
```

## Comandos de Desarrollo

Para cada microservicio, puedes utilizar los siguientes comandos:

- `npm run start:dev`: Iniciar el servicio en modo desarrollo con recarga automática
- `npm run build`: Compilar el servicio


## Seeders

Cada microservicio incluye seeders para poblar la base de datos con datos iniciales. Para ejecutar los seeders:

1. Asegúrate de que el microservicio no esté en ejecución
2. Ejecuta el comando de seed para el microservicio específico:

```bash
# Para rides
cd ms-rides && npx nestjs-command seed:rides

# Para pasajeros
cd ms-passangers && npx nestjs-command seed:passangers

# Para conductores
cd ms-drivers && npx nestjs-command seed:drivers
```

## Documentación de la API

Cada microservicio incluye documentación Swagger. Después de iniciar un servicio, puedes acceder a la documentación de la API en:

```
http://localhost:PUERTO/api
```

Reemplaza PUERTO con el número de puerto configurado en tu archivo .env.

## Notas Importantes

- Asegúrate de que MongoDB esté en ejecución antes de iniciar cualquier microservicio
- Cada microservicio se ejecuta en un puerto diferente por defecto
- Los seeders poblarán la base de datos con datos de ejemplo
- Para el despliegue en producción, asegúrate de configurar las variables de entorno apropiadas
- Se recomienda usar la última versión LTS de Node.js (v20.x)
