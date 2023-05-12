import { checkLogin } from "./requests.js"

function redirectHomeRegister() {


    const homePageButton = document.querySelector(".homeButton")
    const registerPageButton = document.querySelector(".registerButton")
    const formButton = document.querySelector("#changePageRegister")

    registerPageButton.addEventListener("click", () => {
        window.location.replace("../pages/registerPage.html")
    })


    homePageButton.addEventListener("click", () => {
        window.location.replace("/")
    })

    formButton.addEventListener("click", () => {
        window.location.replace("../pages/registerPage.html")
    })

}

checkLogin()
redirectHomeRegister()