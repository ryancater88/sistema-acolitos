export class LoginController{
    constructor(){
        this._tela = document.querySelector('.backdrop-login')
        this._email = document.querySelector('#email')
        this._senha = document.querySelector('#senha')
        this._loginbutton = document.querySelector('#loginbutton')
        this._esqueceusenha = document.querySelector('#esqueceusenha')
    }
    get limpar(){
        this._email.value = ''
        this._senha.value = ''
    }
    get email(){
        return this._email.value
    }
    set email(valor){
        this._email.value = valor
    }
    get senha(){
        return this._senha.value
    }
    set senha(valor){
        this._senha.value = valor
    }
    get loginbutton(){
        return this._loginbutton
    }
    get esqueceusenha(){
        return this._esqueceusenha
    }
}
