const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        // creamos el servidor como propiedad de la clase Server
        this.app = express(); 
        this.port = process.env.PORT;

        this.paths = { // creamos un objeto con todas las rutas
            shopping:'/api/shopping'
        }
        // Luego ejecuta estos metodos ni bien se crea el objeto(sirviendo y creando las rutas)

        // Conectar a la base de datos
        this.conectarDB();

        // middlewares, funcion que siempre se ejecuta al leventar el server
        this.middlewares();

        // definimos las rutas de la aplicación
        this.routes();

        // this.listen(); // podemos añadir esto aqui o llamarlo desde app.js con el objeto ya creado, que seria lo mejor
    }

    async conectarDB () { // creamos la función para conectar a la base de datos
        await dbConnection();
    }

    middlewares(){
        // use - es el termino que dice que este es un middleware
        //cors
        this.app.use(cors())
        
        //Lectura y parseo del body
        this.app.use(express.json());// cualquier información que venga de POST, PUT o DELETE (incluso GET)se va a serializar en formato JSON

        // directorio publico
        //this.app.use(express.static('public'));// servimos el index.html en el ruta /, en / de routes  no se mostrará por tener menor peso
        
    }

    routes(){// metodo para el manejo de las clases
        // aplicamos un middleware, pero para la ruta, es como un condicional para que solo aplicaque en esa ruta
        // lo que carga en esa ruta es el archivo de ruta user (ruta de los usuarios)
        // this.app.use(this.usuariosPath,require('../routes/user'))
        // this.app.use(this.authPath,require('../routes/auth')) // mostrará lo del archivo auth.js de routes

        // establecemos las rutas, las sub rutas de cada ruta
        this.app.use( this.paths.shopping, require('../routes/shopping'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor en el puerto ', this.port)
        })
    }

}

module.exports = Server;
