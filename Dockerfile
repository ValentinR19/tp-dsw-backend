FROM node:22-alpine

WORKDIR /usr/src/app

# Copiamos solo package.json y lock para aprovechar la cache
COPY package*.json ./

# Ajustes de npm para mejorar la estabilidad
RUN npm config set fetch-retries 5 \
  && npm config set fetch-retry-maxtimeout 600000 \
  && npm config set registry https://registry.npmjs.org/

# Usar npm ci si existe package-lock.json, más rápido y seguro
RUN if [ -f package-lock.json ]; then npm ci; else npm install --legacy-peer-deps; fi

# Copiar el resto del código
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

