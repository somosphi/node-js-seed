FROM keymetrics/pm2:10-alpine

RUN mkdir -p /opt/app/
WORKDIR /opt/app/
COPY . .
RUN npm install --production
EXPOSE 3000
CMD ["pm2-runtime", "start", "./process.yml"]

