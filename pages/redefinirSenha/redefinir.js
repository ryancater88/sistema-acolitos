import {
    redefinirController
} from "./redefinir-controller.js";
import {
    Requisicao
} from "../../objects.js"
import {
    Rmodal
} from "../../rcomponent/script/rmodal.js";
import Geral from "../../main.js";
import { loadContent } from "../../router.js";

export default class RedefinirSenha {
    static async abrir() {
        await loadContent('pages/redefinirSenha/redefinirsenha.html', 'content')

        async function scripts() {
            const elementosRedefinir = new redefinirController
            const url = window.location.href
            const paramsString = url.split('?')[1];
            const urlSearchParams = paramsString ? new URLSearchParams(paramsString) : ''
            const params = urlSearchParams ? Object.fromEntries(urlSearchParams.entries()) : ''
            const token = params ? params.token : ''


            elementosRedefinir._confirmarbutton.addEventListener('click', () => {
                const obrigatorios = document.querySelectorAll('[required]')
                const obrigatoriosemBranco = []

                obrigatorios ? obrigatorios.forEach(campo => {
                    campo.value == '' ? obrigatoriosemBranco.push(campo) : null
                }) : ''

                if (obrigatoriosemBranco.length > 0) {
                    return Geral.avisoCamposObrigatorios(obrigatorios)
                }
                if (elementosRedefinir.senha != elementosRedefinir.confirmarsenha) {
                    const modal = new Rmodal({
                        titulo: 'Atenção'
                    }, 'As senhas não são iguais, corrija.')
                    return modal.abrir()
                }

                redefinirSenha()
            })

            async function redefinirSenha() {
                if (!token) {
                    return
                }
                const payload = {
                    token: token,
                    senha: elementosRedefinir.senha,
                    host: window.location.hostname
                }
                const request = new Requisicao(payload, 'trocasenha')

                await request.chamar()

                if (request.response.status == 200) {
                    const modal = new Rmodal({
                        titulo: 'Sucesso'
                    }, 'Senha redefinida com sucesso')
                    modal.abrir()
                    modal.botaoFechar.addEventListener('click', () => {
                        window.location.href = 'index.html'
                    })
                }
            }
        }

        window.addEventListener('DOMContentLoaded', scripts())     
    }
}
