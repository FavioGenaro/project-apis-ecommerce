import { Request, Response } from "express"
import {envs} from '../../config'

export class ChatController{
    // Inyección de dependencias
    constructor (){
    }

    chatearUser = async(req: Request, res:Response) => {
        
        const { inputUser } = req.body;
        const data = {
            "in-0": inputUser, 
            // "user_id": ``
        }
        const response = await fetch(
            `https://api.stack-ai.com/inference/v0/run/${envs.ORG_ID_STACK_AI}/${envs.TAB_ID_STACK_AI}`,
            {
                headers: {
                    'Authorization':`Bearer ${envs.API_KEY_STACK_AI}`,
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "POST");
        res.header("Access-Control-Allow-Headers", "Content-Type");

        // return result;
        res.json({
            result: result.outputs["out-0"]
            // result: result
        });
    }

    chatearPrueba = async(req: Request, res:Response) => {
        
        const { inputUser } = req.body;

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "POST");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        
        res.json({
            result: `Este es un mensaje de prueba. Mensaje del usuario: ${inputUser}. ¡Bienvenido a Bonik, tu asistente virtual de confianza para todas tus necesidades en productos electrónicos!. Nuestro bot está diseñado para ofrecerte una experiencia de compra fluida y eficiente, proporcionándote información detallada sobre una amplia gama de dispositivos electrónicos, desde los últimos smartphones y laptops hasta innovadores gadgets y accesorios.`
        });
    }
}