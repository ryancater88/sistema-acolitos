import { LoginController } from "./login-controller.js";
import { Localstoragedata, Requisicao } from "../../objects.js";
import { Rmodal } from "../../rcomponent/script/rmodal.js";

const elementosLogin = new LoginController

elementosLogin.loginbutton.addEventListener('click', ()=>{   
    const obrigatorios = document.querySelectorAll('[required]')
    const obrigatoriosemBranco = []
    obrigatorios.forEach(campo =>{
        campo.value == ''? obrigatoriosemBranco.push(campo):null
    })
    
    if(obrigatoriosemBranco.length > 0){
        return avisoCamposObrigatorios(obrigatorios)
    }
    
    return login(elementosLogin.email, elementosLogin.senha)
})

elementosLogin.esqueceusenha.addEventListener('click',()=>{
    const emailValor = elementosLogin.email
    const emailBranco = []

    emailValor == ''? emailBranco.push(document.querySelector("#email")):''
    
    if(emailBranco.length > 0){
       return avisoCamposObrigatorios(emailBranco)
    }

    esqueciSenha(emailValor)
})

function avisoCamposObrigatorios(campos){
    console.log(campos)
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

async function login(email, senha){
    const body ={
        email:email,
        senha:senha
    }
    const requisicao = new Requisicao(body, 'login')
     await requisicao.chamar()   
}

async function esqueciSenha(email){
    const payload = {
        email:email
    }
    const requisicao = new Requisicao(payload, 'enviartrocasenha')
   await requisicao.chamar()

   if(requisicao.response.status == 200){
     const modal = new Rmodal

     modal.abrir('Atenção', requisicao.response.mensagem)
   }
}