import { renderCompaniesByCategories, renderCompanies, renderAllDepartments } from "./render.js"
// import { toast } from "./toast.js"

const baseUrl = "http://localhost:3333"
// const green = "#FF5630"
// const red = "#FF5630"

export async function getCategories() {

    const getCategory = await fetch(`${baseUrl}/categories/readAll`, {
        method: "GET",
    })
        .then(res => res.json())

    return getCategory
}

export async function getCompanies() {

    const getCompanie = await fetch(`${baseUrl}/companies/readAll`, {
        method: "GET",
    })
        .then(res => res.json())

    return getCompanie
}

export async function getCompaniesBySector() {

    const selectFilter = document.querySelector("#selectCategories")

    selectFilter.addEventListener("change", async (event) => {
        const selectValue = event.target.value
        if (selectValue == "") {
            await renderCompanies()
        } else {
            const getCompanieByCategorie = await fetch(`${baseUrl}/companies/readByCategory/${selectValue}`, {
                method: "GET",
            })
                .then(async (res) => {
                    const response = await res.json()
                    return response
                })

            renderCompaniesByCategories(getCompanieByCategorie, selectValue)
        }
    })

}

async function createUser(registerBody) {

    const getNewUser = await fetch(`${baseUrl}/employees/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registerBody)
    })
        .then(async (response) => {
            if (response.ok) {
                const responseJson = await response.json()
                window.location.replace("../pages/loginPage.html")
                return responseJson
            } else {
                alert("email ja cadastrado")
                window.location.replace("../pages/loginPage.html")
            }
        })

    return getNewUser
}

export async function getRegisterBody() {
    const inputs = document.querySelectorAll(".inputRegister")
    const buttonRegister = document.querySelector("#registerButton")
    let loginBody = {}
    let count = 0

    buttonRegister.addEventListener("click", async (event) => {
        event.preventDefault()

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                count++
            }

            loginBody[input.name] = input.value
        })

        if (count !== 0) {
            count = 0
            return alert('Por favor preencha os campos necessários')
        } else {
            const token = await createUser(loginBody)

            return token
        }
    })
}

function getLoginBody() {

    const inputEmail = document.querySelector("#inputLoginEmail")
    const inputPassword = document.querySelector("#inputLoginPassword")

    let userBody = {
        email: inputEmail.value,
        password: inputPassword.value
    }

    return userBody
}

export function checkLogin() {
    const buttonLogin = document.querySelector("#loginButton")

    buttonLogin.addEventListener("click", async () => {
        const loginBody = getLoginBody()

        const getLogin = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginBody)
        })

            .then(async (response) => {
                if (response.ok) {
                    const responseJson = await response.json()
                    if (responseJson.isAdm) {
                        localStorage.clear()
                        JSON.stringify(localStorage.setItem("token", responseJson.authToken))
                        JSON.stringify(localStorage.setItem("isAdm", responseJson.isAdm))
                        window.location.replace("../pages/adminPage.html")
                    } else {
                        JSON.stringify(localStorage.setItem("token", responseJson.authToken))
                        JSON.stringify(localStorage.setItem("isAdm", responseJson.isAdm))
                        window.location.replace("../pages/userPage.html")
                    }
                } else {
                    alert("email ou senha inválidos")
                }
            })

        return getLogin
    })
}

export async function getUserData() {

    const tokenAuth = localStorage.getItem("token")

    const userData = await fetch(`${baseUrl}/employees/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${tokenAuth}`
        }
    })
        .then(res => res.json())

    return userData
}


export async function getDepartment(departmentId) {
    const tokenAuth = localStorage.getItem("token")

    const department = await fetch(`${baseUrl}/departments/readById/${departmentId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${tokenAuth}`
        }
    })
        .then(async res => {
            const responseJson = await res.json()
            return responseJson
        })
    return department
}

export async function getAllDepartments() {

    const token = localStorage.getItem("token")

    const departments = await fetch('http://localhost:3333/departments/readAll', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(async (response) => {
            const responseJson = await response.json()
            return responseJson
        })
        .catch(err => console.error(err));

    return departments
}

export async function getDepartmentsByCompanies(selectValue) {


    const companies = await getCompanies()
    const tokenAuth = localStorage.getItem("token")
    const getCompanie = companies.filter(e => e.name == selectValue)
    const fiteredCompanie = getCompanie[0].id

    const getDepartmentByCompanie = await fetch(`${baseUrl}/departments/readByCompany/${fiteredCompanie}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${tokenAuth}`
        }
    })
        .then(async (res) => {
            const response = await res.json()
            return response
        })

    return getDepartmentByCompanie
}

export async function getAllEmployees() {

    const token = localStorage.getItem("token")

    const employeesList = await fetch(`${baseUrl}/employees/readAll`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())

    return employeesList
}

export async function createDep(newDepBody) {

    const token = localStorage.getItem("token")

    const newDep = await fetch(`${baseUrl}/departments/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newDepBody)
    })
        .then(async (response) => {
            if (response.ok) {
                const responseJson = await response.json()
                window.location.replace("../pages/adminPage.html")
                return responseJson
            }
        })

    return newDep
}

export async function getNewDepartment() {
    const modal = document.querySelector(".ModalCreateDepartment")
    const modalCreateDepButton = document.querySelector("#modalCreateDepButton")
    let newDepBody = {}
    const companies = await getCompanies()


    modalCreateDepButton.addEventListener("click", async (event) => {
        event.preventDefault()

        const nameNewDep = document.querySelector("#nameNewDep")
        const descNewDep = document.querySelector("#descNewDep")
        const selectCompanieCreateDep = document.querySelector("#selectCompanieCreateDep")

        if (nameNewDep.value == "" || descNewDep.value == "" || selectCompanieCreateDep.value == "") {
            alert("Por favor preencha os campos necessários")
        } else {

            const getCompany = companies.filter(e => e.name == selectCompanieCreateDep.value)
            const companyId = getCompany[0].id

            newDepBody = {
                name: nameNewDep.value,
                description: descNewDep.value,
                company_id: companyId
            }
        }

        const token = await createDep(newDepBody)

        token
        await renderAllDepartments()
        nameNewDep.value = ""
        descNewDep.value = ""
        selectCompanieCreateDep.value = ""
        modal.close()
    })

}

export async function deleteDepartmentRequest(department_id) {

    const token = localStorage.getItem("token")

    const deleteDepartment = await fetch(`http://localhost:3333/departments/delete/${department_id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async response => {
            const responseJson = await response.json()
            return responseJson
        })

    return deleteDepartment
}

export async function deleteEmployeeRequest(employee_id) {

    const token = localStorage.getItem("token")

    const deleteEmployee = await fetch(`http://localhost:3333/employees/deleteEmployee/${employee_id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async response => {
            const responseJson = await response.json()
            return responseJson
        })

    return deleteEmployee
}

export async function editDepartment(bodyEdit, department_id) {

    const token = localStorage.getItem("token")

    const newDescriptionDep = await fetch(`${baseUrl}/departments/update/${department_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(bodyEdit)
    })
        .then(async res => {
            const responseJson = res.json()
            return responseJson
        })

    return newDescriptionDep
}

export async function editEmployee(bodyEdit, employee_id) {

    const token = localStorage.getItem("token")

    const employeeUpdated = await fetch(`${baseUrl}/employees/updateEmployee/${employee_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(bodyEdit)
    })
        .then(async res => {
            const responseJson = res.json()
            return responseJson
        })

    return employeeUpdated
}

// export async function hireEmployee(department_id, employee_id) {

//     const token = localStorage.getItem("token")

//     const employeeUpdated = await fetch(`${baseUrl}/employees/hireEmployee/${employee_id}`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify(department_id)
//     })
//         .then(async res => {
//             const responseJson = res.json()
//             return responseJson
//         })

//     return employeeUpdated
// }

// export async function getEmployeesOutOfWork() {

//     const token = localStorage.getItem("token")

//     const employeesOutOfWork = await fetch(`${baseUrl}/employees/outOfWork`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//         }
//     })
//         .then(async res => {
//             const responseJson = await res.json()
//             return responseJson
//         })

//     return employeesOutOfWork
// }