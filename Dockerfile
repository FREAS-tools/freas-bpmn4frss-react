FROM node:18.16.0-slim as base

FROM base as build

ENV WEB_PORT=8080

RUN apt-get update -y
RUN apt-get install git -y

WORKDIR /app
COPY . .

# Install and link freas-bpmn4frss-library
RUN git clone https://github.com/FREAS-tools/freas-bpmn4frss-library.git
WORKDIR /app/freas-bpmn4frss-library/src
RUN npm install
RUN npm link

WORKDIR /app
RUN npm install
RUN npm link freas-bpmn4frss-library

FROM base as final

WORKDIR /app
COPY --from=build /app /app
RUN chown -R node:node /app

USER node

EXPOSE 8000
CMD [ "npm", "start", "--", "--host", "0.0.0.0", "--port", "$WEB_PORT"]