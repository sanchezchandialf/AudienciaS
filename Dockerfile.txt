# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar archivos estáticos (cambia dist/ por build/ si es CRA)
COPY dist/ /usr/share/nginx/html

# (Opcional) Config personalizado de Nginx para rutas de React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto web
EXPOSE 80

# Arrancar Nginx
CMD ["nginx", "-g", "daemon off;"]
