import { Localstoragedata } from "../objects.js"
import { Geral } from "../main.js"
import { DashboardElements } from "./dashboard-controller.js"

const local = new Localstoragedata
const pageElements = new DashboardElements

if(local.token == "null"){
    Geral.loginPage()
}

pageElements.cabecalho.sair.addEventListener('click', ()=>{
    local.token = null
    Geral.loginPage()
})