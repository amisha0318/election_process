# Build Stage for Frontend
FROM node:18-alpine as build-stage
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Final Stage
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm install --production
COPY server/ ./server/
COPY --from=build-stage /app/client/dist ./client/dist

EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

CMD ["node", "server/index.js"]
