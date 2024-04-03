FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm config set registry https://nexus.uclv.edu.cu/repository/npm/

RUN npm install --legacy-peer-deps --verbose

RUN rm -rf /app/node_modules

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
