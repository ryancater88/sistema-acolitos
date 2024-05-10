import { LoginController } from "./login-controller.js";
import { Requisicao } from "../objects.js";
import { Rmodal } from "../../rcomponent/script/rmodal.js";
import { Geral } from "../main.js";

const elementosLogin = new LoginController

elementosLogin.loginbutton.addEventListener('click', ()=>{   
    const obrigatorios = document.querySelectorAll('[required]')
    const obrigatoriosemBranco = []
    obrigatorios.forEach(campo =>{
        campo.value == ''? obrigatoriosemBranco.push(campo):null
    })
    
    if(obrigatoriosemBranco.length > 0){
        return Geral.avisoCamposObrigatorios(obrigatorios)
    }
    
    return login(elementosLogin.email, elementosLogin.senha)
})

elementosLogin.esqueceusenha.addEventListener('click',()=>{
    const emailValor = elementosLogin.email
    const emailBranco = []

    emailValor == ''? emailBranco.push(document.querySelector("#email")):''
    
    if(emailBranco.length > 0){
       return Geral.avisoCamposObrigatorios(emailBranco)
    }

    esqueciSenha(emailValor)
})

async function login(email, senha){
    const body ={
        email:email,
        senha:senha
    }
    const requisicao = new Requisicao(body, 'login')
     await requisicao.chamar()

     if(requisicao.response.status == 200){
     Geral.dashboard()}
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