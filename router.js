import {Rloader, Rmodal} from './rcomponent/script/rmodal.js'

export var url = window.location.href

export const  loadContent = async (path, idCreateLocation) => {
    const scriptsCarregados = document.querySelectorAll('script.imported-script')
    const stylesCarregados = document.querySelectorAll('link.imported-style')
    scriptsCarregados.length > 0 ? scriptsCarregados.forEach(script => {script.remove()}):''
    stylesCarregados.length > 0 ? stylesCarregados.forEach(style => {style.remove()}): ''

    if(!path){
        return
    }

    const response = await fetch(path);
    const content = await response.text();

    document.getElementById(idCreateLocation).innerHTML = content;

    const loadLinks = () => {
        // Carregar CSS e JS
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        
        // Carregar CSS
        const cssLinks = tempDiv.querySelectorAll('link[rel="stylesheet"]');
        cssLinks.forEach(link => {
            const newLink = document.createElement('link');
            newLink.rel = link.rel;
            newLink.className = 'imported-style'

            if(!link.href){
                return
            }

            newLink.href = link.href
            newLink.href? document.querySelector('head').append(newLink): ''
        });
    }

    loadLinks()
};

export const handleLocation = async (routes, idCreateLocation) => {
    const loader = new Rloader
    loader.mostrar()
    const regex = /^[^?]+/
    const path = window.location.hash.replace('#', '') || '/';
    let pathFormated = path.match(regex)

    if(!pathFormated){
        pathFormated = path
    }

    if(pathFormated == '/'){
        return window.location.href = '/#/login'
    }

    var route = routes[pathFormated]

    if(!route){
        return
    }

    await route.abrir()
    
    setTimeout(() => {loader.ocultar()}, 100)


};