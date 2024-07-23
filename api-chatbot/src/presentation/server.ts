import express, { Router } from 'express';

interface Options{
    port?: number;
    routes:Router;
}

export class Server {

    // creamos nuestra instancia de express
    // para ello debemos installar el paquete y tambien el tipado para este paquete
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options:Options){
        const {port = 3100, routes } = options;
        this.port = port;
        this.routes = routes; // inicializamos la rutas
        
        this.app.use(express.json());
        this.app.use(this.routes)
    }

    async start(){
        // this.app.use(express.json());
        // this.app.use(this.routes)

        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${ this.port }`)
        })
    }
}