import { LoginController } from "./login-controller.js";
import { DTOLogin } from "./login-dto.js";

const elementosLogin = new LoginController
const construirJsonLogin = new DTOLogin

elementosLogin.loginbutton.addEventListener('click', ()=>{   
    const obrigatorios = document.querySelectorAll('[required]')
    const obrigatoriosemBranco = obrigatorios.length > 0
    
    if(obrigatoriosemBranco){
        return avisoCamposObrigatorios(obrigatorios)
    }
})

function avisoCamposObrigatorios(campos){
    campos.forEach(campo =>{
        const msgObrigatorioCampo = campo.parentElement.querySelector('p')
        const campoNaoPossuiValor = !campo.value
        const campoNaoEstaEmVermelho = !campo.classList.contains('red-input')
        
        if (campoNaoPossuiValor && campoNaoEstaEmVermelho) {
            campo.classList.add('red-input');
            msgObrigatorioCampo.style.visibility = 'visible'
            campo.addEventListener('input', removerAviso);
        }
    });
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