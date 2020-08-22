FROM node:12-slim

RUN mkdir /var/app && chown www-data:www-data /var/app
WORKDIR /var/app
COPY ./package.json /var/app/
COPY ./yarn.lock /var/app/
RUN yarn install
COPY . /var/app/

ENTRYPOINT ["./entrypoint.sh"]
CMD ["run"]