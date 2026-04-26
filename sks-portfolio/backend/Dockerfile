FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm pm2 && pnpm install

COPY . .

RUN pnpm run build

EXPOSE 5000

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
