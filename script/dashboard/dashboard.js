import { Localstoragedata } from "../objects.js"
import { Geral } from "../main.js"

const local = new Localstoragedata

console.log(local.token)

if(local.token == null){
    Geral.loginPage()
}

