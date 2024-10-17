FROM --platform=linux/amd64 node:20.14 AS base

# Declare build arguments from docker-compose.local.yaml. Set default arguments
ARG NODE_ENV=dev
ARG API_URL=http://localhost/api

RUN mkdir -p /home/vite/app
RUN npm config set cache /tmp --global
WORKDIR /home/vite
COPY .env ./

WORKDIR /home/vite/app
COPY ./client/package.json ./client/package-lock.json ./
RUN npm ci

COPY client ./

# Set environment variables from build arguments
ENV NODE_ENV=${NODE_ENV}
ENV API_URL=${API_URL}

RUN npm run build

#CMD ["npm", "run", "start"]

# Run stage
FROM --platform=linux/amd64 nginx:1.23.2-alpine
COPY --from=base /home/vite/app/build /var/www/app
COPY ./infra/nginx/conf/ /etc/nginx/conf.d
EXPOSE 80 443
