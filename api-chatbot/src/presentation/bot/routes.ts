// En este archivo se definen las rutas del endpoint auth
import { Router } from "express"; // importamos Rputer de express
import { ChatController } from './controller'

export class ChatRoutes{
    // Lo creamos como método statico para evitar crear instancias de la clase AppRoutes
    // si usamos inyección de dependencias podemos usar métodos normales no estaticos
    static get routes(): Router{
        
        const router = Router();
        const controller = new ChatController();

        router.post('/chat', controller.chatearUser);
        router.post('/chatPrueba', controller.chatearPrueba);

        return router;
    }
}