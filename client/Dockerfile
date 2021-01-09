FROM node:lts-alpine

# install simple http server for serving static content

# make the 'app' folder the current working directory
WORKDIR ./client

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 3000
CMD [ "http-server", "-p 3000", "dist" ]