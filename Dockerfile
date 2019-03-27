# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VUE_APP_WEBSOCKET_ENDPOINT
ENV VUE_APP_WEBSOCKET_ENDPOINT $VUE_APP_WEBSOCKET_ENDPOINT
ARG VUE_APP_GRAPHQL_ENDPOINT
ENV VUE_APP_GRAPHQL_ENDPOINT $VUE_APP_GRAPHQL_ENDPOINT
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]