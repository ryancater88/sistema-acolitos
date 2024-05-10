import { Requisicao } from "./objects.js";
import { Rloader, Rmodal } from "../rcomponent/script/rmodal.js";
import { Localstoragedata } from "./objects.js";

export class Geral{
    static loginPage(){
        window.location.href = "index.html"
    }
    static dashboard(){
        window.location.href = "main.html"
    }
    static avisoCamposObrigatorios(campos){
        campos.forEach(campo =>{
            const msgObrigatorioCampo = campo.parentElement.querySelector('p')
            const campoNaoPossuiValor = !campo.value
            const campoNaoEstaEmVermelho = !campo.classList.contains('red-input')
            
            if (campoNaoPossuiValor && campoNaoEstaEmVermelho) {
                campo.classList.add('red-input');
                msgObrigatorioCampo.style.visibility = 'visible'
                campo.addEventListener('input', removerAviso);
            }
            function removerAviso(event) {
                const campo = event.target;
                const msgObrigatorioCampo = campo.parentElement.querySelector('p')
                const campoEstaEmVermelho = campo.classList.contains('red-input');
            
                if (campoEstaEmVermelho) {
                    campo.classList.remove('red-input');
                    msgObrigatorioCampo.style.visibility = 'hidden'
                    campo.removeEventListener('input', removerAviso);
                }
            }
        });
    } 
    async verificaToken(){
        const loader = new Rloader
        loader.mostrar()
        const localStorage = new Localstoragedata
        const token = localStorage.token
        const payload = {
            token:token
        }
        const requisaoVerifica = new Requisicao(payload, 'verificatoken')
            await requisaoVerifica.chamar()
        
            if(!requisaoVerifica.response.autenticado){
                Geral.loginPage()
                loader.ocultar()
            }
        loader.ocultar()
    }
}
