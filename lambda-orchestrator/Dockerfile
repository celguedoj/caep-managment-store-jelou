FROM public.ecr.aws/lambda/nodejs:20

# Copiar los archivos de la lambda
COPY . .

# Instalar dependencias
RUN npm install

# Comando por defecto de Lambda
CMD ["handler.handler"]
