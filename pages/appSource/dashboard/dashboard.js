import { loadContent } from "../../../router.js"
import Ui from "../appUi.js"

export default class Dashboard{
    static async abrir () {
        await Ui.abrir()
        await loadContent('pages/appSource/dashboard/dashboard.html', 'content-page')
    }

}