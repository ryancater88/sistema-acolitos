import { Rloader } from "../rcomponent/script/rmodal.js"
import { Rmodal } from "../rcomponent/script/rmodal.js"
import { Geral } from "./main.js"

export class Localstoragedata{
  constructor(token){
      this._token = token
  }
  set token(value){
      this._token = value
      localStorage.setItem('token', this._token)
  }
  get token(){
      return localStorage.getItem('token')
  }
}

const storageData = new Localstoragedata
const token = storageData.token? storageData.token.replace('#', '%23'): null

export class Requisicao{
    constructor(payload, path){
        this._url = `https://script.google.com/macros/s/AKfycbyH-ANsGQ8Ri-XbVASu88WUdZbCZZQNxlGTdIv0mgCUszhiUiQk62eTZU5252Y2bXhOIA/exec?path=${path}&token=${token}`
        this.payload = payload
        this.response = ''
    }
   
      async chamar(){
        const loader = new Rloader
        loader.mostrar()

        const opt = { 
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(this.payload)}

        const url = this._url

        await fetch(url, opt)
        .then(response => {
            return response.json()
        })
        .then(response => {
            this.response = response
          
            if (response.dados && typeof response.dados.token !== 'undefined') {
                storageData.token = response.dados.token;
            }
              
            if(response.status == 401){
              const modal = new Rmodal
              modal.abrir('Erro', response.mensagem)
              Geral.loginPage()
            }

            if(response.status != 200){
                const modal = new Rmodal
                modal.abrir('Erro', response.mensagem || response.Mensagem)
            }
            loader.ocultar()
        })
    }
}

export class Email{
    static formatar(email){
      email? email = email.trim().toLowerCase() : email = null
      return email
    }
    static valido(field) {
      field? field = Email.formatar(field): field = null
      const usuario = field.substring(0, field.indexOf("@"));
      const dominio = field.substring(field.indexOf("@")+ 1, field.length);
  
      if ((usuario.length >=1) &&
          (dominio.length >=3) &&
          (usuario.search("@")==-1) &&
          (dominio.search("@")==-1) &&
          (usuario.search(" ")==-1) &&
          (dominio.search(" ")==-1) &&
          (dominio.search(".")!=-1) &&
          (dominio.indexOf(".") >=1)&&
          (dominio.lastIndexOf(".") < dominio.length - 1)){
        return true
      }
      return false
    }
  }

  export class Cpf{
    static formatar(cpf){
      cpf = String(cpf)
      return cpf.trim().replace(/\D/g, "")
    }
  
    static valido(strCPF) {
      var Soma;
      var Resto;
      Soma = 0;
  
      if (strCPF == "00000000000") return false;
  
      for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
  
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
  
      Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
  
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }
  }