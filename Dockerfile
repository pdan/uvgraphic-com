FROM node

WORKDIR /app
COPY . .
RUN npm i
ENV NODE_ENV=production
CMD node index.js