import {Rloader, Rmodal} from './rcomponent/script/rmodal.js'

const routes = {
    '/dashboard': '/pages/dashboard/dashboard.html',
    '/financeiro': '/pages/financeiro.html,',
    '/login': '/pages/login/login.html',
    '/redefinirsenha' : '/pages/redefinirsenha/redefinirsenha.html'
};

const loadContent = async (path) => {

    const response = await fetch(path);
    const content = await response.text();
    document.getElementById('content').innerHTML = content;
     // Carregar CSS e JS
     const tempDiv = document.createElement('div');
     tempDiv.innerHTML = content;
     
     // Carregar CSS
     const cssLinks = tempDiv.querySelectorAll('link[rel="stylesheet"]');
     cssLinks.forEach(link => {
         const regex = /([^\/]+\.js)$/
         const hrefFormated = link.href.match(regex)

         if(!hrefFormated){
            return
         }

         const newLink = document.createElement('link');
         newLink.rel = link.rel;
         newLink.href = `pages/login/${hrefFormated[0]}`
         newLink.href? document.querySelector('head').append(newLink): ''
     });
 
     // Carregar JS
     const scripts = tempDiv.querySelectorAll('script');
     scripts.forEach(script => {
         const newScript = document.createElement('script');
         newScript.src = script.src
         newScript.type = script.type
         document.querySelector('body').append(newScript)
     });
};

const handleLocation = async () => {
    
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

    await loadContent(route);    
    loader.ocultar()
};

window.addEventListener('hashchange', handleLocation);
window.addEventListener('load', handleLocation);