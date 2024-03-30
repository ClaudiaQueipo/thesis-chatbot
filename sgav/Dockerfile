FROM node:18

WORKDIR /app

COPY package.json ./
# COPY package-lock.json ./

RUN npm config set registry https://nexus.uclv.edu.cu/repository/npm/

RUN npm install --loglevel verbose

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]
