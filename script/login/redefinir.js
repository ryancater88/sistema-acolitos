import { redefinirController } from "./redefinir-controller.js";
import { Geral } from "../main.js";
import { Requisicao } from "../objects.js";
import { Rmodal } from "../../rcomponent/script/rmodal.js";

const elementosRedefinir = new redefinirController
const url = window.location.href
const urlParams = new URLSearchParams(new URL(url).search)
const token = urlParams.get('token')

elementosRedefinir._confirmarbutton.addEventListener('click', ()=>{   
    const obrigatorios = document.querySelectorAll('[required]')
    const obrigatoriosemBranco = []
    
    obrigatorios? obrigatorios.forEach(campo =>{ campo.value == ''? obrigatoriosemBranco.push(campo):null}):''
    
    if(obrigatoriosemBranco.length > 0){
        return Geral.avisoCamposObrigatorios(obrigatorios)
    } 
    if(elementosRedefinir.senha != elementosRedefinir.confirmarsenha){
        const modal = new Rmodal('Verifique', 'As senhas não são iguais, corrija.')
        return modal.abrir()
    } 
    
    redefinirSenha()
})

async function redefinirSenha(){
    if(!token){
        return
    }
    const payload = {
        token:token,
        senha:elementosRedefinir.senha
    }
    const request = new Requisicao(payload, 'trocasenha')

    await request.chamar()

    const modal = new Rmodal('Sucesso', 'Senha redefinida com sucesso')
    modal.abrir()
    

    modal.botaoFechar.addEventListener('click', ()=>{
        window.location.href = 'index.html'
    })
}