FROM node:lts

RUN mkdir -p /usr/src/app && \
    chown -R node:node /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y jq

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY --chown=node:node install/package.json /usr/src/app/package.json

USER node

RUN npm install && \
    npm cache clean --force

COPY --chown=node:node . /usr/src/app

ENV NODE_ENV=production \
    daemon=false \
    silent=false

EXPOSE 4567

# Create a shell script for the build process
RUN echo '#!/bin/sh' > /build_nodebb.sh && \
    echo './nodebb build' >> /build_nodebb.sh && \
    chmod +x /build_nodebb.sh

# Run the NodeBB setup and build shell script, then start NodeBB
CMD ./create_config.sh -n "${SETUP}" && \
    ./nodebb setup && \
    /build_nodebb.sh && \
    /build_nodebb.sh && \
    node ./nodebb start