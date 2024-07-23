import { get } from "env-var";

export const envs = {
    
    PORT: get('PORT').required().asPortNumber(),
    API_KEY_STACK_AI: get('API_KEY_STACK_AI').required().asString(),
    TAB_ID_STACK_AI: get('TAB_ID_STACK_AI').required().asString(),
    ORG_ID_STACK_AI: get('ORG_ID_STACK_AI').required().asString(),
}