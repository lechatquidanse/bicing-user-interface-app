FROM node:8.12.0-alpine as bicing_ui_app_dev

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN yarn upgrade \
    && yarn install

COPY . ./
RUN yarn run build

CMD ["yarn", "start"]


FROM nginx:1.15.1-alpine AS bicing_ui_app_prod

# uncomment when using react router
#RUN rm -rf /etc/nginx/conf.d
#COPY docker/production/conf /etc/nginx

COPY --from=bicing_ui_app_dev /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
