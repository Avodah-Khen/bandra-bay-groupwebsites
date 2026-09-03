FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY prisma ./prisma
RUN ./node_modules/.bin/prisma generate --schema=./prisma/schema.prisma

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

ENV NODE_ENV=production

EXPOSE 4000

# Database migrations are run once per Render deploy via preDeployCommand.
# The container itself only starts the API, so restarts are fast and do not reseed the DB.
CMD ["npm", "start"]
