FROM --platform=linux/amd64 node:20.14 AS base

RUN mkdir -p /home/node/app
WORKDIR /home/node
COPY .env ./
COPY private.key ./

WORKDIR /home/node/app
COPY ./server/package.json ./server/package-lock.json ./
RUN npm ci --only=production
RUN npm cache clean --force

COPY server ./


# Run stage
FROM --platform=linux/amd64 node:20.14-alpine

RUN mkdir -p /home/node/app
COPY --from=base /home/node /home/node
WORKDIR /home/node/app
EXPOSE 4000

CMD ["npm", "run", "start"]