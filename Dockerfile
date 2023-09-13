FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "dist/main.js"]
# CMD ["npm", "run", "start"]

EXPOSE 4000