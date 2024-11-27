FROM node:18 

WORKDIR /usr/src/app
RUN npm i -g @nestjs/cli typescript ts-node

COPY package*.json ./
RUN yarn install

COPY . .
RUN rm -rf .env && cp env-example .env
RUN yarn run build

EXPOSE 3001

CMD ["yarn", "run", "start:dev"]



