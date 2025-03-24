FROM node:22.12.0

RUN mkdir -p /usr/src/chat-component

COPY chat-component/package.json /usr/src/chat-component

WORKDIR /usr/src/chat-component

RUN npm install

COPY . .

ENV HOST=0.0.0.0


CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]