import { LoginController } from "./login-controller.js";
import { Email, Requisicao } from "../../objects.js";
import { Rmodal } from "../../rcomponent/script/rmodal.js";
import Geral from "../../main.js";


const elementosLogin = new LoginController

elementosLogin.loginbutton.addEventListener('click', ()=>{   
    login()

})

elementosLogin.esqueceusenha.addEventListener('click',()=>{
    esqueciSenha()

})

elementosLogin._senha.addEventListener('keydown', (e)=>{
    if(e.key == 'Enter'){
        login(elementosLogin.email, elementosLogin.senha)
        return
    }

})

async function login(){
    const validacoes = Geral.verificaValidacoes()
    
    if(!validacoes){
        return
    }

    const body ={
        email:elementosLogin.email,
        senha:elementosLogin.senha
    }
    const requisicao = new Requisicao(body, 'login')
    await requisicao.chamar()

    if(requisicao.response.status == 200){
        Geral.dashboard()
    }

}

async function esqueciSenha(){
    if(!elementosLogin.email){
        Geral.avisoCamposObrigatorios([elementosLogin._email])
        return
    }

    const emailValido = Email.valido(elementosLogin.email)

    if(!emailValido){
        const divEmail = elementosLogin._email.parentElement
        const mensagemCampo = divEmail.querySelector('p')
        
        mensagemCampo.textContent = 'Email inválido'

        Geral.verificaValidacoes()
        return
    }

    const payload = {
        email:elementosLogin.email,
        host:window.location.host,
        port:window.location.port
    }
    const requisicao = new Requisicao(payload, 'enviartrocasenha')
    await requisicao.chamar()

    if(requisicao.response.status == 200){
        const modal = new Rmodal({titulo:'Atenção'}, requisicao.response.mensagem)
        modal.abrir()
    }
   
}