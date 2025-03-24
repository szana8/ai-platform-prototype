FROM node:latest

RUN mkdir -p /usr/src/nuxt-app

COPY web/package.json /usr/src/nuxt-app

WORKDIR /usr/src/nuxt-app

RUN npm install

COPY . .

EXPOSE 3000

# CMD ["npm", "run", "start"]