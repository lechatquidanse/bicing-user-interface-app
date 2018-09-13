FROM node:8.12.0-alpine as bicing_app_node

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./
RUN yarn run build

CMD ["yarn", "start"]


FROM nginx:1.15.1-alpine AS bicing_app_nginx

# uncomment when using react router
#RUN rm -rf /etc/nginx/conf.d
#COPY docker/nginx /etc/nginx

COPY --from=bicing_app_node /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
