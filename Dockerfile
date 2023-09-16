FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=Production
COPY package*.json ./
RUN npm install 
COPY . .
CMD ["npm", "run","start"]
EXPOSE 4000