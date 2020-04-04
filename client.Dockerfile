### STAGE 1: Build ###
FROM node:12.3 AS builder

RUN mkdir /mean-app

WORKDIR /mean-app

# Add package.json before rest of repo for caching
COPY package.json package-lock.json /mean-app/

RUN npm install --silent --progress=false

COPY . /mean-app

RUN npm run build

### STAGE 2: Setup ###
FROM nginx:1.15.7-alpine

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64 /usr/local/bin/dumb-init

RUN chmod +x /usr/local/bin/dumb-init
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /mean-app/dist /usr/share/nginx/html
COPY --from=builder /mean-app/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /mean-app/ssl /etc/nginx/ssl

CMD ["dumb-init", "nginx", "-g", "daemon off;"]