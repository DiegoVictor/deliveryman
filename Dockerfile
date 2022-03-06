FROM node:12
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
EXPOSE 3333
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "dev:server"]
