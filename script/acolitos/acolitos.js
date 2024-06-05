import { Rmodal } from "../../rcomponent/script/rmodal.js";
import Geral from "../../main.js";
import { AcolitosElements } from "./acolitos-controller.js";
import { AcolitoForm } from "./acolitos-controller.js";

document.querySelector('#logoff').addEventListener('click', ()=>{
    Geral.logOff()
})

AcolitosElements.buttonIncluir.addEventListener('click', ()=>{
    const formAcolitos = new AcolitoForm
    formAcolitos.abrirForm()

})

