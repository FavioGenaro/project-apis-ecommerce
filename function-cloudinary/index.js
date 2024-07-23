
require('dotenv').config(); // toma el .env y las establece como variables de entorno

const Server = require('./models/server');
const server = new Server(); // ya se tiene el index.html servido y las rutas 
server.listen(); // con esto levantamos el servidor