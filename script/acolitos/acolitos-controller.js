import { Rmodal } from "../../rcomponent/script/rmodal.js"
import Geral from "../../main.js"

export const AcolitosElements = {
    inputSearch : document.querySelector('input.search'),
    buttonSearch : document.querySelector('button.button-search') ,
    buttonIncluir : document.querySelector('button.incluir-button') ,
    lista : document.querySelector('.lista'),
    
}

export class AcolitoForm{
    constructor(id, contexto, nome, dataNascimento, sexo, email, cpf, celular, responsavel){
        this._id = id ?? 1
        this._contexto = contexto ?? 1
        this._nome = nome ?? ''
        this._dataNascimento = dataNascimento ?? ''
        this._sexo = sexo ?? 'M'
        this._email = email ?? ''
        this._cpf = cpf ?? ''
        this._celular = celular ?? ''
        this._responsavel = responsavel ?? ''
    }

     abrirForm(){
        const modeloModal = `<form id=${this._id} class="modal-form" action="submit" context=${this._contexto}>
                                <div class="form-input-group">
                                    <label for="Nome">Nome:</label>
                                    <input type="text" class="form-input" id="nome" maxlength="70" required>
                                    <p class="msg-obrigatorio">Obrigatório*</p>
                                </div>
                                <div class="form-input-group">
                                    <label for="datanascimento">Data Nascimento:</label>
                                    <input type="date" class="form-input" id="datanascimento" required>
                                    <p class="msg-obrigatorio">Obrigatório*</p>
                                </div>
                                <div class="form-input-group">
                                    <label for="sexo">Sexo:</label>
                                <select name="sexo" id="sexo" required>
                                    <option  value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                </select>
                                    <p class="msg-obrigatorio">Obrigatório*</p>
                                </div>
                                <div class="form-input-group">
                                    <label for="Email">Email:</label>
                                    <input type="email" class="form-input" id="email" maxlength="40" required>
                                    <p class="msg-obrigatorio">Obrigatório*</p>
                                </div>
                                <div class="form-input-group">
                                    <label for="cpf">Cpf:</label>
                                    <input type="cpf" class="form-input" id="cpf" maxlength="11" required>
                                    <p class="msg-obrigatorio">Obrigatório*</p>
                                </div>
                                <div class="form-input-group">
                                    <label for="celular">Celular:</label>
                                    <input type="tel" class="form-input" id="celular" maxlength="11" required>
                                    <p class="msg-obrigatorio" class="msg-obrigatorio">Obrigatório*</p>
                                </div>
                                <div class="form-input-group oculto">
                                    <label for="responsavel">Responsável:</label>
                                    <input type="text" class="form-input" id="responsavel" maxlength="60">
                                    <p class="msg-obrigatorio">Obrigatório*</p>
                                </div>
                            </form>`

            const modal = new Rmodal('Acólito', modeloModal,1)
            modal.abrir()

            const nomeForm = document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="nome"]`)
            const dataNascimentoForm =  document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="datanascimento"]`)
            const sexoForm =  document.querySelector(`form[id="${this._id}"]>div.form-input-group>select[id="sexo"]`)
            const emailForm =  document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="email"]`)
            const cpfForm =  document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="cpf"]`)
            const celularForm =  document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="celular"]`)
            const responsavelForm =  document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="responsavel"]`)
            const botaoSalvarForm =  document.querySelector(`button.rmodal-primarybutton[id="${modal.idModal}"]`)

            nomeForm.value = this._nome
            dataNascimentoForm.value = this._dataNascimento
            sexoForm.value = this._sexo
            emailForm.value = this._email
            cpfForm.value = this._cpf
            celularForm.value = this._celular
            responsavelForm.value = this._responsavel

            function verificaApresentaResponsavel(){
                const maiorIdade = Geral.validaMaiorIdade(dataNascimentoForm.value)
            
                if(maiorIdade){
                    if(!responsavelForm.parentElement.classList.contains('oculto')){
                        responsavelForm.removeAttribute('required')
                        responsavelForm.parentElement.classList.add('oculto')
                        
                    }
                    return
            
                }
                responsavelForm.parentElement.classList.remove('oculto')
                responsavelForm.setAttribute('required','')
        
            }

            function salvar(){ 
                const validacoesOk = Geral.verificaValidacoes()
        
                if(validacoesOk){
                return true

                }

            }

           botaoSalvarForm.addEventListener('click', salvar)
           dataNascimentoForm.addEventListener('focusout', verificaApresentaResponsavel)
        
    }

    get id(){
        return this._id
    }
    get contexto(){
        return this._contexto
    }
    get nome(){
        return  document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="nome"]`).value
    }
    get dataNascimento(){
        return document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="datanascimento"]`).value
    }
    get sexo(){
        return document.querySelector(`form[id="${this._id}"]>div.form-input-group>select[id="sexo"]`).value
    }
    get email(){
        return document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="email"]`).value
    }
    get cpf(){
        return document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="cpf"]`).value
    }
    get celular(){
        return document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="celular"]`).value
    }
    get responsavel(){
        return document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="responsavel"]`).value
    }
    set nome(value){
        return  document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="nome"]`).value = value
    }
    set dataNascimento(value){
        return document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="datanascimento"]`).value = value
    }
    set sexo(value){
        return document.querySelector(`form[id="${this._id}"]>div.form-input-group>select[id="sexo"]`).value = value
    }
    set email(value){
        return document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="email"]`).value = value
    }
    set cpf(value){
        return document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="cpf"]`).value = value
    }
    set celular(value){
        return document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="celular"]`).value = value
    }
    set responsavel(value){
        return document.querySelector(`form[id="${this._id}"]>div.form-input-group>input[id="responsavel"]`).value = value
    }
}