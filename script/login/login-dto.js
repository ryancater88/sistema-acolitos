export class DTOLogin{
    constructor(token, email, senha, url, status, mensagem){
        this.url = url
        this.status = status
        this.mensagem = mensagem 
        this.token = token
        this.email = email
        this.senha = senha
    }
    get json(){
        return {
            status: this.status,
            mensagem: this.mensagem,
            token: this.token,
            email: this.email,
            senha: this.senha
        }
    }
}