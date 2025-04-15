# Microservicio de Viajes (Rides)

Este microservicio se encarga de gestionar los viajes disponibles en el sistema.

## Requisitos

- Node.js (v16 o superior)
- MongoDB
- NestJS CLI

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
$ npm install
```

## Configuración

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rides
```

## Ejecución

```bash
# desarrollo
$ npm run start

# modo watch
$ npm run start:dev

# producción
$ npm run start:prod
```

## Comandos

Para poblar la base de datos con datos de prueba:

```bash
$ npx nestjs-command seed:rides
```

## API

La API está disponible en `/rides/api`

### Endpoints

- `GET /rides` - Obtener todos los viajes
- `GET /rides/available` - Obtener viajes disponibles
- `GET /rides/available/distance` - Obtener viajes disponibles por distancia

# Migrations

## Seed Commodities:

$ npx nestjs-command seed:drivers

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

