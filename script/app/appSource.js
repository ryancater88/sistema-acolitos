import Geral from "../../main.js"
import { Cabecalho, Rodape } from "../cabecalhoRodape/cabecalhoRodape-controller.js"
import { Localstoragedata } from "../../objects.js"

class AppSource{
    constructor(){
        this.appSource()
    }
    async appSource(){
        const cab = new Cabecalho().render()
        const rodape = new Rodape().render()
        const local = new Localstoragedata()
        
        document.querySelector('header').appendChild(cab)
        document.querySelector('footer').appendChild(rodape)

        if(local.token == 'null'){
            Geral.logOff()
        }

    }  
} 

export const appSource = new AppSource()