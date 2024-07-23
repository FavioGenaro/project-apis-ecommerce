
import { Router } from "express"; // importamos Rputer de express
import { ChatRoutes } from "./bot/routes";
import { Request, Response } from "express"

export class AppRoutes{
    // Lo creamos como método statico para evitar crear instancias de la clase AppRoutes
    // si usamos inyección de dependencias podemos usar métodos normales no estaticos
    static get routes(): Router{
        
        const router = Router();
        router.options('*', (req: Request, res:Response)=>{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,POST");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.status(204).send('Options');
        });
        router.use('/api', ChatRoutes.routes);

        return router;
    }
}