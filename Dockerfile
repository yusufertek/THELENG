# PHP'nin hazır bir imajını kullan
FROM php:8.2-cli

# Gerekirse dosyaları kopyala
COPY . /var/www/html

# Çalışma dizinini ayarla
WORKDIR /var/www/html

# 0.0.0.0:10000'de php sunucusunu başlat
CMD ["php", "-S", "0.0.0.0:10000"]
