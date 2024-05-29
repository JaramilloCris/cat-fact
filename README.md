# cat-fact

## Descripción

Proyecto web que se basa en CatFact, una API que entrega mensajes relacionados con gatos. En este un usuario se puede registrar a partir de su nombre, ver cat-fact, darle likes y visualizar distintas opciones a partir de esto

## Pasos de instalación
- Clona el repositorio en tu máquina local utilizando git clone.
- Navega hasta el directorio del proyecto.
- Crear un .env con la variable de BACKEND_URL (por defecto ttp://localhost:8000)
- Ejecuta docker-compose up para construir las imágenes de Docker y  
levantar los contenedores.

## Docker Compose
El archivo docker-compose.yml define los servicios que componen la aplicación. Aquí hay una descripción de los servicios principales:

- frontend: Este es el servicio que se encarga del frontend en React. Se construye a partir de una imagen de Docker de node 16.

- backend: Este servicio se encarga del backend en FastApi. Esta construido a partir de una imagen de Docker de python 3.9

- db: Este es el servicio que ejecuta la base de datos. Se construye a partir de una imagen de Docker de postgres que tiene todo lo necesario para ejecutar la base de datos.