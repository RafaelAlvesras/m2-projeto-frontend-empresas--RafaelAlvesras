import {getRegisterBody} from "./requests.js"

function redirectHomeLogin() {
    const homePageButton = document.querySelector(".homeButton")
    const loginPageButton = document.querySelector(".loginButton")
    const changeHomeButton = document.querySelector("#changeHomeButton")
    
    loginPageButton.addEventListener("click", () => {
        window.location.replace("../pages/loginPage.html")
    })
    
    homePageButton.addEventListener("click", () => {
        window.location.replace("/")
    })
    
    changeHomeButton.addEventListener("click", () => {
        window.location.replace("/")
    })
}

getRegisterBody()
redirectHomeLogin()