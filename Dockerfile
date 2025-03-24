FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www


ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

#previous code
# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    redis-tools

RUN chmod +x /usr/local/bin/install-php-extensions && sync && \
    install-php-extensions \
    mbstring  \
    pdo_mysql  \
    zip  \
    exif  \
    pcntl  \
    gd  \
    pgsql  \
    pdo_pgsql

RUN pecl install -o -f redis \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable redis

RUN curl https://getmic.ro | sh && \
    mv micro /usr/local/bin/micro && \
    micro -plugin install editorconfig && \
    micro -plugin install filemanager

# Clear cache
RUN apt-get clean

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy existing application directory contents
COPY . /var/www

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]