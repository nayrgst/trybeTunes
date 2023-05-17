FROM node:20.1.0-alpine
WORKDIR /app-frontend
COPY package* ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]