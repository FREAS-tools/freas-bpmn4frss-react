FROM node:18.16.0-slim as base

WORKDIR /app

FROM base as build

RUN apt-get update -y
RUN apt-get install git -y

COPY . .

# Install and link freas-bpmn4frss-library
RUN git clone https://github.com/FREAS-tools/freas-bpmn4frss-library.git
WORKDIR /app/freas-bpmn4frss-library/src
RUN npm install
RUN npm link

WORKDIR /app
RUN npm install
RUN npm link freas-bpmn4frss-library

EXPOSE 8000
CMD [ "npm", "start", "--", "--host", "0.0.0.0", "--port", "8000"]