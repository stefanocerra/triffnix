FROM node:20 as build-stage

WORKDIR /app

COPY /frontend/package*.json ./

RUN yarn install

COPY ../frontend .

RUN yarn run build

# pocketbase
FROM alpine:latest as production-stage

ARG PB_VERSION=0.21.1

RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# uncomment to copy the local pb_migrations dir into the image
COPY ./pb_migrations /pb/pb_migrations

COPY ./pb_data /pb/pb_data

COPY --from=build-stage /app/dist/spa /pb/pb_public

EXPOSE 8080

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]