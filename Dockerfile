FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 
RUN npm install -g @nestjs/cli

COPY . .

EXPOSE 8000

ENV NODE_ENV=development

CMD ["npm", "run", "start:dev"]
