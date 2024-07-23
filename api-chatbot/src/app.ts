import { Server } from "./presentation/server"
import { AppRoutes } from "./presentation/routes";
import { envs } from "./config";
import * as newrelic from 'newrelic';
(()=>{
    main()
})()

async function main() {

    // console.log("Main");
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    }).start();
}