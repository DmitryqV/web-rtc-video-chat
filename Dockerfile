
FROM node:16

WORKDIR /

ENV PATH="./node_modules/.bin:$PATH"

COPY . .

RUN npm install

CMD ["npm", "npx nodemon server.js", "react-scripts start"]