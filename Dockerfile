FROM node:16

WORKDIR /

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PATH="./node_modules/.bin:$PATH"

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]
