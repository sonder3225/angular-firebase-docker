# ----------------------------------------------------------------------
# STAGE 1: Build (Compilación de la aplicación Angular)
# ----------------------------------------------------------------------
FROM node:lts-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 🚨 LÍNEA CRÍTICA 1: Compila directamente en /app/dist (sin subcarpetas anidadas)
RUN npm run build -- --output-path=./dist --configuration=production


# ----------------------------------------------------------------------
# ----------------------------------------------------------------------
# STAGE 2: Run
# ----------------------------------------------------------------------
FROM nginx:alpine AS final

# ... (Configuración de Nginx permanece igual) ...

# 🟢 LÍNEA CORREGIDA FINAL: Copia el CONTENIDO de la subcarpeta 'browser'
# Esto trae el index.html de Angular a la raíz de /usr/share/nginx/html
COPY --from=build /app/dist/browser /usr/share/nginx/html 

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]