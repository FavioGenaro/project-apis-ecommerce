// https://log-api.newrelic.com/log/v1 -- HTTPS endpoint

// https://gov-log-api.newrelic.com/log/v1 -- FedRAMP endpoint

require('newrelic');
require('dotenv').config(); // toma el .env y las establece como variables de entorno

const winston = require('winston');
const { transports } = winston;
const newrelicFormatter = require('@newrelic/winston-enricher')(winston);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        newrelicFormatter(),
        winston.format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' })
    ]
});

logger.info('Hello, this is a log message!');

const Server = require('./models/server');
const server = new Server(); // ya se tiene el index.html servido y las rutas 
server.listen(); // con esto levantamos el servidor

