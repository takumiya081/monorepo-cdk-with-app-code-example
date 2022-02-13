ARG APP_DIR="/usr/app"
ARG SERVICE_DIR="services/hello/hello_lambda_on_docker"

FROM node:14-buster as build-image
ARG APP_DIR
ARG SERVICE_DIR
# AWS Lambda runtime dependencies
RUN apt-get update && \
    apt-get install -y \
        g++ \
        make \
        unzip \
        libcurl4-openssl-dev \
        autoconf \
        libtool \
        cmake

WORKDIR ${APP_DIR}

COPY ./package.json ./yarn.lock ./turbo.json ./
COPY ./${SERVICE_DIR}/package.json ./${SERVICE_DIR}/
COPY ./packages/ ./packages/

RUN yarn install && yarn add -W aws-lambda-ric

COPY ./${SERVICE_DIR}/ ./${SERVICE_DIR}/

WORKDIR ${APP_DIR}
RUN yarn build

FROM node:14-buster-slim

ARG APP_DIR
ARG SERVICE_DIR

# AWS Lambda runtime dependencies
RUN apt-get update && \
    apt-get install -y \
        g++ \
        make \
        unzip \
        libcurl4-openssl-dev \
        autoconf \
        libtool \
        cmake

WORKDIR ${APP_DIR}

COPY --from=build-image ${APP_DIR} ${APP_DIR}

COPY ./${SERVICE_DIR}/aws-lambda-rie /usr/local/bin/aws-lambda-rie
COPY ./${SERVICE_DIR}/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod u+x /usr/local/bin/entrypoint.sh /usr/local/bin/aws-lambda-rie
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]
WORKDIR ${APP_DIR}/${SERVICE_DIR}/dist
ENV HOME="/tmp"
CMD [ "app.handler" ]
