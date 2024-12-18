# Usa la imagen oficial de Python
FROM python:3.9

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos requeridos
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copia el código fuente
COPY . .

# Copia el script de entrada
COPY entrypoint.sh /app/entrypoint.sh

# Da permisos de ejecución al script de entrada
RUN chmod +x /app/entrypoint.sh

# Instala socat para verificar la disponibilidad del puerto
RUN apt-get update && apt-get install -y socat

# Establece un argumento para el entorno
ARG ENV=production
ENV ENV=${ENV}

# Expone el puerto 8000
EXPOSE 8000

# Usa el script de entrada como el comando por defecto
ENTRYPOINT ["/app/entrypoint.sh"]
