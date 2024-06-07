import Geral from "../../main.js";
import { Localstoragedata } from "../../objects.js";


class Cabecalho{
    constructor(){
        this.botaoPaginaInicial
        this.botaoSair
    }

    render(){
        const modeloCabecalho = document.createElement('nav');
        modeloCabecalho.classList.add('navbar', 'navbar-expand-lg', 'navbar-dark');
        modeloCabecalho.id = 'cabecalho';

        const navbarBrand = document.createElement('a');
        navbarBrand.classList.add('navbar-brand');
        navbarBrand.href = '#';

        const imgLogo = document.createElement('img');
        imgLogo.classList.add('page-logo');
        imgLogo.src = 'source/pagelogo.png';
        imgLogo.alt = 'Logo do site';
        navbarBrand.appendChild(imgLogo);

        const navbarToggler = document.createElement('button');
        navbarToggler.classList.add('navbar-toggler');
        navbarToggler.type = 'button';
        navbarToggler.dataset.toggle = 'collapse';
        navbarToggler.dataset.target = '#navbarNav';
        navbarToggler.setAttribute('aria-controls', 'navbarNav');
        navbarToggler.setAttribute('aria-expanded', 'false');
        navbarToggler.setAttribute('aria-label', 'Toggle navigation');

        const navbarTogglerIcon = document.createElement('span');
        navbarTogglerIcon.classList.add('navbar-toggler-icon');
        navbarToggler.appendChild(navbarTogglerIcon);

        const navbarCollapse = document.createElement('div');
        navbarCollapse.classList.add('collapse', 'navbar-collapse');
        navbarCollapse.id = 'navbarNav';

        const navbarNav = document.createElement('ul');
        navbarNav.classList.add('navbar-nav', 'ml-auto');

        const navItemHome = document.createElement('li');
        navItemHome.classList.add('nav-item', 'active');

        const linkHome = document.createElement('a');
        linkHome.classList.add('nav-link');
        linkHome.id = 'home';
        linkHome.href = 'main.html';
        linkHome.textContent = 'Página Inicial ';

        const spanSrOnly = document.createElement('span');
        spanSrOnly.classList.add('sr-only');
        spanSrOnly.textContent = '(current)';
        linkHome.appendChild(spanSrOnly);
        navItemHome.appendChild(linkHome);

        const navItemLogoff = document.createElement('li');
        navItemLogoff.classList.add('nav-item');

        const linkLogoff = document.createElement('a');
        linkLogoff.classList.add('nav-link');
        linkLogoff.id = 'logoff';
        linkLogoff.href = '#';
        linkLogoff.textContent = 'Sair';
        navItemLogoff.appendChild(linkLogoff);

        navbarNav.appendChild(navItemHome);
        navbarNav.appendChild(navItemLogoff);

        navbarCollapse.appendChild(navbarNav);

        modeloCabecalho.appendChild(navbarBrand);
        modeloCabecalho.appendChild(navbarToggler);
        modeloCabecalho.appendChild(navbarCollapse);

        linkLogoff.addEventListener('click', ()=>{
            Geral.logOff()
        })

        this.botaoSair = linkHome
        this.botaoPaginaInicial = linkLogoff

        return modeloCabecalho
    }

}

class Rodape{
    constructor(){
        this.mensagemRodape
    }

    render(){
      // Modelo de rodapé
        const modeloRodape = document.createElement('div');
        const anoAtual = new Date().getFullYear()
        const msgAcolitos = 'Acólitos PSPA. Todos os direitos reservados.'
        modeloRodape.classList.add('footer');
        modeloRodape.innerHTML = `<p>© ${anoAtual} ${msgAcolitos}</p>`;

        this.mensagemRodape = msgAcolitos

        return modeloRodape
    }

}

export{Cabecalho, Rodape}