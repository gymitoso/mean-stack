FROM node:12.3

RUN mkdir /mean-app

WORKDIR /mean-app

# Add package.json before rest of repo for caching
COPY package.json package-lock.json /mean-app/

RUN npm install --silent --progress=false

RUN npm install pm2@4.2.3 -g

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64 /usr/local/bin/dumb-init

RUN chmod +x /usr/local/bin/dumb-init

COPY . /mean-app

RUN rm -rf src

EXPOSE 4000

CMD ["dumb-init", "npm", "run", "server:docker"]
