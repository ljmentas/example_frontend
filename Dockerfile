FROM nginx
RUN mkdir -p /var/www/app/static
COPY ./dist /var/www/app/static
COPY ./lemon.nginx.conf /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/lemon.nginx.conf"]
