# PHP 8.2 CLI imajını kullan
FROM php:8.2-cli

# Projeyi konteynerin içine kopyala
COPY . /var/www/html

# Çalışma dizini ayarla
WORKDIR /var/www/html

# PHP sunucusunu başlat
CMD ["php", "-S", "0.0.0.0:10000"]
