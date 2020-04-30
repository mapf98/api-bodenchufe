# API-BODEnchufe 🔌 💸

Esta es la API del E-Commerce BODEnchufe, con esta se podrán adquirir todos los recurso necesarios para el Cliente y nuestro Back-Office correspondiente.

### Pre-Requisitos 📝 

A continuación nombraremos los requisitos necesarios para ejecturar la aplicación de manera local:

+ Entorno de ejecución: [Node.js](https://nodejs.org/es/) >= v11.14.0
+ Manejador de BD relacional: [PostgresSQL](https://www.postgresql.org/) > v11
+ Administrador de paquetes: [NPM](https://www.npmjs.com/) >= 6.7.0
+ Sistema de control de versiones: [GIT](https://git-scm.com/) >= 2.20

**Nota**: sugerimos usar Postman para realizar peticiones de prueba hacia la API, puede encontrar una collección de peticiones y ejecutarlas desde la herramienta [API-BODEnchufe](https://documenter.getpostman.com/view/6132312/SzfDxkL6?version=latest).

## Empecemos 📚

Las siguientes instrucciones servirán para tener un copia funcional de la API:


Primero debemos clonar el repositorio actual en una carpeta (creada previamente en nuestro lugar de preferencia) con el siguiente comando:

```
git clone https://github.com/mapf98/api-bodenchufe.git
cd api-bodenchufe
```

Luego de clonar el repositorio y movernos a la carpeta creada, procedemos a instalar las dependencias del package.json con el siguiente comando:

```
npm install
```

A continuación, dos elementos claves de configuración

+ Luego de instaladas las depedendencias, tenemos que agregar el .env a la raíz del proyecto (entregada por los estudiantes).

+ Depués procedemos a crear la base de datos a través de pgAdmin (con el nombre indicado en el archivo previo) con el script create.sql y luego realizamos los inserts a través del script insert.sql

Luego de los pasos anteriores, iniciamos el servidor con el siguiente comando:

```
npm run serve
```

Y listo, la API ya estará disponible para su uso 🚀

## Construido con 🔧🔨

```
"dependencies": {
    "body-parser": "^1.19.0",
    "chalk": "^4.0.0",
    "compression": "^1.7.4",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "helmet": "^3.22.0",
    "http-errors": "^1.7.3",
    "humps": "^2.0.1",
    "jwt-simple": "^0.5.6",
    "moment": "^2.24.0",
    "pg-promise": "^10.5.2",
    "winston": "^3.2.1"
}
```

```
"devDependencies": {
    "@babel/cli": "^7.8.4",
    "babel-preset-env": "^1.7.0",
    "eslint": "^6.8.0",
    "eslint-config-prettier": "^6.11.0",
    "eslint-plugin-import": "^2.20.2",
    "eslint-plugin-prettier": "^3.1.3",
    "jest": "^25.5.2",
    "nodemon": "^2.0.3",
    "prettier": "^2.0.5",
    "superagent": "^5.2.2",
    "supertest": "^4.0.2"
}
```

## Pruebas unitarias

Ya se cuenta integrada la herramienta para el manejo y automatización de pruebas unitarias pero aún no han sido incluidas para seguir el contendio de la materia.

## Authors

* [Alexander Fernández](https://github.com/alexjose131)
* [Diego De Quintal](https://github.com/diegodequintal)
* [Miguel Peña](https://github.com/mapf98)
