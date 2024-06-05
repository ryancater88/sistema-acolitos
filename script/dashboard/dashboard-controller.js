
export class DashboardElements{
    constructor(){
        this.cabecalho = {
            paginaIncial: document.getElementById('home'),
            sair: document.getElementById('logoff')
        },
        this.menuAcolitos = document.getElementById('acolitos'),
        this.menuEscala = document.getElementById('escala'),
        this.menuParametros = document.getElementById('parametros')
    }
}