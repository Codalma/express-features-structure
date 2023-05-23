# Base stage
FROM node:alpine as base

WORKDIR /usr/src/app/api

COPY package*.json ./
COPY tsconfig.json ./
COPY ecosystem.config.json ./

RUN npm install
RUN npm cache clean --force

COPY . .

# Development stage
FROM base as dev

CMD ["npm", "run", "dev"]


# Test stage
FROM base as test

CMD ["npm", "run", "test:coverage"]


# Production stage
FROM base as prod

RUN npm run build

# Install production dependencies
RUN npm install --only=production
RUN npm install typescript
RUN npm install pm2 -g

# Clean npm cache
RUN npm cache clean --force

# Run the application
CMD ["npm", "run", "start"]
