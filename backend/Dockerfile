FROM node:20

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
