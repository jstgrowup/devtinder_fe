FROM node:20-alpine3.18 AS build
# Declare build time enviroment variables
ARG NEXT_PUBLIC_NODE_ENV
ARG NEXT_PUBLIC_API_URL
# set default values for enviroment variable
ENV NEXT_PUBLIC_NODE_ENV=$NEXT_PUBLIC_NODE_ENV
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# BUild App
WORKDIR /app
COPY package*.json .
RUN npm install 
COPY . .
RUN npm run build

#Serve with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 3000
ENTRYPOINT [ "nginx","-g","daemon off;" ] 
