FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install 
CMD ["node", "dist/main.js"]
EXPOSE 4000