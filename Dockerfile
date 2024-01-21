FROM node:18-alpine

WORKDIR /server/express-prisma

COPY . /server/express-prisma

RUN npm install

EXPOSE 8000

ENV NODE_ENV production

CMD ["npm", "run", "start"]