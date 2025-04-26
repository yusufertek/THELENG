# PHP'nin hazır bir imajını kullanıyoruz
FROM php:8.2-cli

# Çalışma dizini oluştur ve proje dosyalarını kopyala
WORKDIR /var/www/html
COPY . /var/www/html

# PHP dahili sunucusunu başlat
CMD ["php", "-S", "0.0.0.0:10000"]
