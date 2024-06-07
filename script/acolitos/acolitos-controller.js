import { Rmodal } from "../../rcomponent/script/rmodal.js"
import Geral from "../../main.js"
import { Acolito } from "./acolitos.js"
import { Requisicao } from "../../objects.js"

export const AcolitosElements = {
    inputSearch : document.querySelector('input.search'),
    buttonSearch : document.querySelector('button.button-search') ,
    buttonIncluir : document.querySelector('button.incluir-button') ,
    lista : document.querySelector('.lista'),
    
}

class AcolitoLista{
    async carregar(){
        const requisicao = new Requisicao('', 'acolito-lista')
        await requisicao.chamar()

        const listaAcolitosResponse = requisicao.response.dados.listaacolitos

        if(!listaAcolitosResponse){
            return
        }

        listaAcolitosResponse.forEach((acolito) => {
            const acolitoListaItem = new AcolitoListaItem(acolito.id, acolito.nome)
            acolitoListaItem.incluir()
        })
 
    }
}

class AcolitoListaItem{
    constructor(id, nome){
        this.id = id
        this.nome = nome
        this.botaoAlterar
        this.botaoExcluir
    }

    incluir(){
       const itemAcolito = document.createElement('div')
             itemAcolito.className = 'item-lista'
             itemAcolito.id = this.id

       const nomeAcolito = document.createElement('p')
            nomeAcolito.className = 'item-lista__info'
            nomeAcolito.textContent = this.nome

       const grupoBotoes = document.createElement('div')
             grupoBotoes.className = 'item-lista__group-button'

        const botaoAlterar = document.createElement('button')
                botaoAlterar.className = 'item-lista-button'
                botaoAlterar.id = 'alterar'

        const imgAlterar = document.createElement('img')
                imgAlterar.className = 'icon'
                imgAlterar.src ='source/alterar.png'
                imgAlterar.alt = 'Alterar'
        
        const botaoExcluir = document.createElement('button')
                botaoExcluir.className = 'item-lista-button'
                botaoExcluir.id = 'excluir'

        const imgExcluir = document.createElement('img')
                imgExcluir.className = 'icon'
                imgExcluir.src ='source/lixeira.png'
                imgExcluir.alt = 'excluir'

        botaoAlterar.addEventListener('click', async () => {
            const acolito = new Acolito
            const requestBody = {
                id:this.id
            }
            const requisicao = new Requisicao(requestBody, 'acolito')

            await requisicao.chamar()

            if(requisicao.response.status == '200'){
                const acolitoForm = new AcolitoForm(
                    requisicao.id,
                    2,
                    requisicao.nome,
                    requisicao.datanascimento,
                    requisicao.sexo,
                    requisicao.email,
                    requisicao.cpf,
                    requisicao.celular,
                    requisicao.responsavel
                )

                acolitoForm.abrirForm()
                return

            }

            return

        })
        
        botaoExcluir.addEventListener('click', async () => {
            const modalConfirmaExclusao = new Rmodal(
                'Atenção',
                'Tem certeza que deseja excluir esse registro?',
                1
            )

            modalConfirmaExclusao.abrir()
            modalConfirmaExclusao.botaoSalvar.textContent = 'Sim'
            modalConfirmaExclusao.botaoSalvar.addEventListener('click', async ()=>{
                modalConfirmaExclusao.fechar()
                const requestBody = {
                    id:this.id
                }
                const requisicao = new Requisicao(requestBody, 'acolito-excluir')
                await requisicao.chamar()

                if(requisicao.response.status == '200'){
                    itemAcolito.remove()
                }
            })
        })

        botaoAlterar.appendChild(imgAlterar)
        botaoExcluir.appendChild(imgExcluir)
        grupoBotoes.appendChild(botaoAlterar)
        grupoBotoes.appendChild(botaoExcluir)
        itemAcolito.appendChild(nomeAcolito)
        itemAcolito.appendChild(grupoBotoes)

        const lista = document.querySelector('.lista')

        lista.appendChild(itemAcolito)
        
    }

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

            async function salvar(){ 
                const validacoesOk = Geral.verificaValidacoes()
        
                if(validacoesOk){
                    const acolito = new Acolito(
                        this.id, 
                        this.nome, 
                        this.dataNascimento,
                        this.sexo,
                        this.email,
                        this.cpf,
                        this.celular
                    )

                    const acolitoIncluido = await acolito.incluir()
                   
                    if(!acolitoIncluido){
                        return
                    }

                    modal.fechar()

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

export {AcolitoListaItem, AcolitoLista}