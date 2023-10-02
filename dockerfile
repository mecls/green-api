FROM --platform=linux/amd64 node
WORKDIR /app
COPY package.json .
RUN npm install 
COPY . .
EXPOSE 3001
CMD [ "npm", "start" ]