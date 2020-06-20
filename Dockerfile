FROM node:12

WORKDIR /API/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]