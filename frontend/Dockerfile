# Etapa de construcción
FROM node:16 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de package y lock
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de desarrollo
FROM node:16 AS dev

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de package y lock
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código de la aplicación
COPY . .


# Comando para correr la aplicación en modo desarrollo
CMD ["npm", "start"]
