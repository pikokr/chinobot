FROM node:14.13.0

RUN mkdir -p /app

RUN npm install --global ts-node

RUN yarn

WORKDIR /app

COPY . .

CMD ["/app/run-docker.sh"]
