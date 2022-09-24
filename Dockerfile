FROM node:16.13.0

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn 
COPY . .

CMD ["yarn", "start:dev"]