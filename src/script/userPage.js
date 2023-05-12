import { renderUserData, renderEmployeesCompany } from "./render.js"

function logout() {
    const logoutButton = document.querySelector(".logoutButton")

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token")
        localStorage.removeItem("isAdm")
        window.location.replace("/")
    })
}

await renderEmployeesCompany()
await renderUserData()
logout()