import { renderCategories, renderCompanies} from "./render.js"
import { getCompaniesBySector } from "./requests.js"

function redirect() {
    const loginPageButton = document.querySelector(".loginButton")
    const registerPageButton = document.querySelector(".registerButton")
    
    registerPageButton.addEventListener("click", () => {
        window.location.replace("./src/pages/registerPage.html")
    })
    
    loginPageButton.addEventListener("click", () => {
        window.location.replace("./src/pages/loginPage.html")
    })
    
}

await renderCategories()
await renderCompanies()
await getCompaniesBySector()
redirect()

