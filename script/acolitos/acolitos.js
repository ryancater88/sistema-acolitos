import { Rmodal } from "../../rcomponent/script/rmodal.js";
import Geral from "../../main.js";
import { AcolitoLista, AcolitosElements } from "./acolitos-controller.js";
import { AcolitoForm } from "./acolitos-controller.js";
import { appSource } from "../app/appSource.js";
import { Requisicao } from "../../objects.js";


AcolitosElements.buttonIncluir.addEventListener('click', ()=>{
    const formAcolitos = new AcolitoForm
    formAcolitos.abrirForm()

})

class Acolito{
    constructor(id, nome, dataNascimento, sexo, email, cpf, celular){
        this.id = id
        this.nome = nome
        this.dataNascimento = dataNascimento
        this.sexo = sexo
        this.email = email
        this.cpf = cpf
        this.celular = celular
    }
    async incluir(){
        const requestBody ={
            id:this.id,
            nome:this.nome,
            datanascimento:this.dataNascimento,
            sexo:this.sexo,
            email:this.email,
            cpf:this.cpf,
            celular:this.celular
        }
        const requisicao = new Requisicao(requestBody, 'acolito-incluir')

        await requisicao.chamar()

        if(requisicao.response.status == 200){
            AcolitoLista.carregar()

            return true
            
        }

        return false

    }

}

export {Acolito}