FROM node:18-alpine

# Install Python and build dependencies
RUN apk add --no-cache python3

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]