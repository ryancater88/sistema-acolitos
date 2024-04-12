import { Rloader } from "./rcomponent/script/rmodal.js"
import { Rmodal } from "./rcomponent/script/rmodal.js"

export class Requisicao{
    constructor(payload, path){
        this._url = 'https://script.google.com/macros/s/AKfycbwAalhIoCgV2HRVLf1VeKvYCzihXhGGS4fi3CMi_WyUXZQecIvIfG31sqt5eJRzcEOz/exec?path='+path+'&local=4'
        this.payload = payload
        this.response = ''
    }
   
    get chamar(){
        const loader = new Rloader
        loader.mostrar()

        const opt = { 
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(this.payload)}

        const url = this._url

        fetch(url, opt)
        .then(response => {
            return response.json()
        })
        .then(response => {
            this.response = response
            if(response.status != 200){
                const modal = new Rmodal
                modal.abrir('Erro', response.mensagem || response.Mensagem)
            }
            loader.ocultar()
        })
    }
}

export class Localstoragedata{
    constructor(token){
        this.token = token
    }
    set token(value){
        this.token = value
        localStorage.setItem('token', this.token)
    }
    get token(){
        return localStorage.getItem('token')
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