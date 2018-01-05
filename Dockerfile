FROM 'node:9.3-alpine'

WORKDIR /usr/src/app

COPY built/dist/package*.json ./

RUN npm install --production

COPY built/dist/. .

EXPOSE 4000

ENV MONGO_URL mongodb://db:27017/rsvpman

CMD ["node", "index.js"]