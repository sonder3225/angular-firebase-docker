
# (Compilación de la aplicación Angular)

FROM node:lts-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

#  Compila directamente en /app/dist 
RUN npm run build -- --output-path=./dist --configuration=production



#  Run
# ----------------------------------------------------------------------
FROM nginx:alpine AS final

# ... (Configuración de Nginx ) ...


COPY --from=build /app/dist/browser /usr/share/nginx/html 

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]