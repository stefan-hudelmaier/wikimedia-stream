FROM node as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:alpine

ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci --production

COPY --from=builder /usr/src/app/dist ./dist

CMD [ "node", "dist/index.js" ]
