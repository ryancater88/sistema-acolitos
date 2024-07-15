export class redefinirController{
    constructor(){
        this._tela = document.querySelector('.backdrop-login')
        this._senha = document.querySelector('#senha')
        this._confirmarsenha = document.querySelector('#confirmarsenha')
        this._confirmarbutton = document.querySelector('#confirmarbutton')
    }
    get limpar(){
        this._senha.value = ''
        this._confirmarsenha.value = ''
    }
    get senha(){
        return this._senha.value.toString()
    }
    get confirmarsenha(){
        return this._confirmarsenha.value.toString()
    }
    set senha(valor){
        this._senha.value = valor
    }
    set confirmarsenha(valor){
        this._confirmarsenha.value = valor
    }
    get loginbutton(){
        return this._confirmarbutton
    }
}