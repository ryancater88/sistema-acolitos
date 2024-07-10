import { Cpf, Email, Requisicao } from "./objects.js";
import { Rloader, Rmodal } from "../rcomponent/script/rmodal.js";
import { Localstoragedata } from "./objects.js";

export default class Geral{

    static loginPage(){
        window.location.href = "/#/login"
    }

    static dashboard(){
        window.location.href = "/#/dashboard"
    }

    static logOff(){
        const local = new Localstoragedata
        local.token = null
        Geral.loginPage()
    }

    static avisoCamposObrigatorios(campos){
        campos.forEach(campo =>{
            const msgObrigatorioCampo = campo.parentElement.querySelector('p')
            const campoNaoPossuiValor = !campo.value
            const campoNaoEstaEmVermelho = !campo.classList.contains('red-input')
            
            if (campoNaoPossuiValor && campoNaoEstaEmVermelho) {
                campo.classList.add('red-input');
                msgObrigatorioCampo.style.visibility = 'visible'
                campo.addEventListener('input', removerAviso);
            }
            function removerAviso(event) {
                const campo = event.target;
                const msgObrigatorioCampo = campo.parentElement.querySelector('p')
                const campoEstaEmVermelho = campo.classList.contains('red-input');
            
                if (campoEstaEmVermelho) {
                    campo.classList.remove('red-input');
                    msgObrigatorioCampo.style.visibility = 'hidden'
                    campo.removeEventListener('input', removerAviso);
                }
            }
        });
    } 

    static verificaValidacoes(){
        const camposCpf = document.querySelectorAll('input[type=cpf]')
        const camposEmail = document.querySelectorAll('input[type=email]')
        const camposObrigatorios = document.querySelectorAll('input[required]')

        const obrigatoriosPreenchidos = validaObrigatorios()
        const cpfValido = validaCpf()
        const emailValido = validaEmail()

        function validaObrigatorios(){
            if(!camposObrigatorios){
                return true
            }

            var camposObrigatoriosEmBranco = []

            camposObrigatorios.forEach(campo =>{
                const msgObrigatorioCampo = campo.parentElement.querySelector('p')
                const campoNaoPossuiValor = !campo.value
                const campoNaoEstaEmVermelho = !campo.classList.contains('red-input')
                
                if(campoNaoPossuiValor){
                    camposObrigatoriosEmBranco.push(campo)
                }

                if (campoNaoPossuiValor && campoNaoEstaEmVermelho) {
                    campo.classList.add('red-input');
                    msgObrigatorioCampo.textContent  ='Obrigatório*'
                    msgObrigatorioCampo.style.visibility = 'visible'
                    campo.addEventListener('input', removerAviso);

                    function removerAviso(event) {
                        const campo = event.target;
                        const msgObrigatorioCampo = campo.parentElement.querySelector('p')
                        const campoEstaEmVermelho = campo.classList.contains('red-input');
                    
                        if (campoEstaEmVermelho) {
                            campo.classList.remove('red-input');
                            msgObrigatorioCampo.style.visibility = 'hidden'
                            campo.removeEventListener('input', removerAviso);
                        }
                    }

                }

            });

            if(camposObrigatoriosEmBranco.length > 0){
                return false
            }

            return true
        }
        
        function validaCpf(){
            if(!camposCpf){
                return true
            }

            var camposCpfInvalido = []

            camposCpf.forEach(campo => {
                const msgObrigatorioCampo = campo.parentElement.querySelector('p')
                const cpfValido = Cpf.valido(campo.value)
    
                if(!cpfValido){
                    camposCpfInvalido.push(campo)
                    const campoNaoEstaEmVermelho = !campo.classList.contains('red-input')              
                    
                    if(campoNaoEstaEmVermelho){
                        campo.classList.add('red-input');
                        msgObrigatorioCampo.textContent  ='Cpf Inválido'
                        msgObrigatorioCampo.style.visibility = 'visible'
                        campo.addEventListener('input', removerAviso);
                    }

                    function removerAviso(event) {
                        const campo = event.target;
                        const msgObrigatorioCampo = campo.parentElement.querySelector('p')
                        const campoEstaEmVermelho = campo.classList.contains('red-input');
                    
                        if (campoEstaEmVermelho) {
                            campo.classList.remove('red-input');
                            msgObrigatorioCampo.style.visibility = 'hidden'
                            campo.removeEventListener('input', removerAviso);
                        }
                    }

                }
    
            })

            if(camposCpfInvalido.length > 0){
                return false
            }

            return true
        }

        function validaEmail(){
            if(!camposEmail){
                return true
            }

            var camposEmailInvalido = []

            camposEmail.forEach(campo => {
                const msgObrigatorioCampo = campo.parentElement.querySelector('p')
                const emailValido = Email.valido(campo.value)
    
                if(!emailValido){
                    camposEmailInvalido.push(campo)
                    const campoNaoEstaEmVermelho = !campo.classList.contains('red-input')              
                    
                    if(campoNaoEstaEmVermelho){
                        campo.classList.add('red-input');
                        msgObrigatorioCampo.textContent  ='Email Inválido'
                        msgObrigatorioCampo.style.visibility = 'visible'
                        campo.addEventListener('input', removerAviso);
                    }

                    function removerAviso(event) {
                        const campo = event.target;
                        const msgObrigatorioCampo = campo.parentElement.querySelector('p')
                        const campoEstaEmVermelho = campo.classList.contains('red-input');
                    
                        if (campoEstaEmVermelho) {
                            campo.classList.remove('red-input');
                            msgObrigatorioCampo.style.visibility = 'hidden'
                            campo.removeEventListener('input', removerAviso);
                        }
                    }

                }
    
            })

            if(camposEmailInvalido.length > 0){
                return false
            }

            return true
        }

        if(cpfValido && obrigatoriosPreenchidos && emailValido){
            return true
        }
        
        return false
    }

    async verificaToken(){
        const loader = new Rloader
        loader.mostrar()
        const localStorage = new Localstoragedata
        const token = localStorage.token
        const payload = {
            token:token
        }
        const requisaoVerifica = new Requisicao(payload, 'verificatoken')
            await requisaoVerifica.chamar()
        
            if(!requisaoVerifica.response.autenticado){
                Geral.loginPage()
                loader.ocultar()
            }
        loader.ocultar()
    }

    static validaMaiorIdade(data){
        if(!data){
            return true

         }

        const dataAtual = new Date()
        const dataDezoitoAnosAtras = new Date(dataAtual.getFullYear() - 18, dataAtual.getMonth(), dataAtual.getDate())
        var dataNascimento = new Date(data)
            dataNascimento.setDate(dataNascimento.getDate() + 1)

        if(dataNascimento <= dataDezoitoAnosAtras){
           return true

        }
        return false

    }

}