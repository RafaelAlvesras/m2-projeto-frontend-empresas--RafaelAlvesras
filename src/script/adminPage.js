import { renderSelectCompanies, renderDepartments, renderAllDepartments, renderAllEmployees } from "./render.js"


function logoutAdmin() {
    
    const logoutButton = document.querySelector(".logoutButtonAdmin")
    
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token")
        localStorage.removeItem("isAdm")
        window.location.replace("/")
    })
}

renderAllEmployees()
renderAllDepartments()
renderDepartments()
renderSelectCompanies()
logoutAdmin()
