import { handleLocation } from "../router.js";
import Dashboard from "./appSource/dashboard/dashboard.js";
import Login from "./login/login.js";
import RedefinirSenha from "./redefinirSenha/redefinir.js";

const routes = {
    '/dashboard': Dashboard,
    '/login': Login,
    '/redefinirsenha' : RedefinirSenha
};
export function callMainLoad(){
    handleLocation(routes, 'content')
}

window.addEventListener('hashchange', callMainLoad);
window.addEventListener('load', callMainLoad);