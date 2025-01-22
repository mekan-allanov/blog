FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build
EXPOSE 5000
# RUN npm install -g nodemon ts-node
# CMD ["nodemon", "src/index.ts"]
CMD ["npm", "run", "dev"]