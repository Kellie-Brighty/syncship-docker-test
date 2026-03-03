FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# Let SyncShip (via Nginx) know what port we expose
EXPOSE 8080

CMD ["npm", "start"]
