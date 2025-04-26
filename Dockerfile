# PHP 8.2 CLI imajını kullanıyoruz
FROM php:8.2-cli

# Proje dosyalarını konteynere kopyala
COPY . /var/www/html

# Çalışma dizinini belirle
WORKDIR /var/www/html

# PHP dahili web sunucusunu başlat
CMD ["php", "-S", "0.0.0.0:10000"]
