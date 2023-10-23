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


# Create a shell script that runs the sequence twice
RUN echo '#!/bin/sh' > /start_nodebb.sh && \
    echo './create_config.sh -n "${SETUP}" && ./nodebb setup && ./nodebb build; node ./nodebb start' >> /start_nodebb.sh && \
    chmod +x /start_nodebb.sh

# Run the shell script twice
CMD /start_nodebb.sh && /start_nodebb.sh