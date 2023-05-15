import { renderSelectCompanies, renderDepartments, renderAllDepartments, renderAllEmployees, renderSelectCompaniesModalCreateDep, deleteDepartmentModal, deleteEmployeeModal} from "./render.js"
import {openModalCreateDep, editDepartmentModal,  editEmployeeModal} from "./modal.js"
import {getNewDepartment} from "./requests.js"

function logoutAdmin() {
    
    const logoutButton = document.querySelector(".logoutButtonAdmin")
    
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token")
        localStorage.removeItem("isAdm")
        window.location.replace("/")
    })
}

// console.log(await getEmployeesOutOfWork())
await renderSelectCompanies()
await renderAllDepartments()
await renderDepartments()
openModalCreateDep() 
await getNewDepartment()
await renderSelectCompaniesModalCreateDep()
await renderAllEmployees()
await deleteDepartmentModal()
await deleteEmployeeModal()
editDepartmentModal()
editEmployeeModal()
logoutAdmin()

// function authentication() {
//     const token = localStorage.getItem("token");
//     const adm = JSON.parse(localStorage.getItem("isAdm"))


//     if (!token) {
//         location.replace("/index.html");
//      if (adm !== true) {
//         location.replace("./userPage.html")
//     } else if (adm){
//         location.replace("./adminPage.html")
//     }}
// }

// authentication()