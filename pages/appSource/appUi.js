import Geral from "../../main.js"
import { loadContent } from "../../router.js"

export default class Ui{

    static async abrir () {
        await loadContent('pages/appSource/appUi.html', 'content')

        async function scripts () {
        }

        window.addEventListener('DOMContentLoaded', scripts())
    }
}