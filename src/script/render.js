import { getAllEmployees, getCategories, getCompanies, getUserData, getDepartment, getAllDepartments, getDepartmentsByCompanies } from "./requests.js"


export async function renderCategories() {
    const selectCategories = document.querySelector("#selectCategories")
    const categoriesList = await getCategories()

    categoriesList.forEach(element => {
        const optionCategorie = document.createElement("option")

        optionCategorie.innerText = element.name
        optionCategorie.value = element.name

        selectCategories.appendChild(optionCategorie)
    });
}

export async function renderCompanies() {
    const companiesList = document.querySelector(".companiesList")
    const companies = await getCompanies()
    const categoriesList = await getCategories()

    companiesList.innerHTML = ""

    companies.forEach((companie) => {
        const cardCompanie = document.createElement("li")
        const nameCompanie = document.createElement("h1")
        const sectorCompanie = document.createElement("p")

        nameCompanie.innerText = companie.name

        const getSector = categoriesList.filter(e => companie.category_id == e.id)
        sectorCompanie.innerText = getSector[0].name

        cardCompanie.classList.add("companieCard")
        nameCompanie.classList.add("companieName")
        sectorCompanie.classList.add("companieSector")

        companiesList.appendChild(cardCompanie)
        cardCompanie.append(nameCompanie, sectorCompanie)
    })
}

export async function renderCompaniesByCategories(companies, category) {
    const companiesList = document.querySelector(".companiesList")

    companiesList.innerHTML = ""

    companies.forEach((companie) => {
        const cardCompanie = document.createElement("li")
        const nameCompanie = document.createElement("h1")
        const sectorCompanie = document.createElement("p")

        nameCompanie.innerText = companie.name

        sectorCompanie.innerText = category

        cardCompanie.classList.add("companieCard")
        nameCompanie.classList.add("companieName")
        sectorCompanie.classList.add("companieSector")

        companiesList.appendChild(cardCompanie)
        cardCompanie.append(nameCompanie, sectorCompanie)
    })
}

export async function renderUserData() {

    const userData = await getUserData()

    const sectionDataUser = document.querySelector(".userSection")
    const userName = document.createElement("h1")
    const userEmail = document.createElement("p")

    userName.innerText = userData.name
    userEmail.innerText = userData.email

    userName.classList.add("userName")
    userEmail.classList.add("userEmail")

    sectionDataUser.append(userName, userEmail)
}

export async function renderEmployeesCompany() {
    const userData = await getUserData()

    const employeesCompany = document.querySelector(".employeesCompany")

    if (userData.company_id == null) {

        const divemployeesNone = document.createElement("div")
        const userOutOfWork = document.createElement("p")

        userOutOfWork.innerText = "Você ainda não foi contratado"

        divemployeesNone.classList.add("employeesNone")
        userOutOfWork.classList.add("userOutOfWork")

        employeesCompany.appendChild(divemployeesNone)
        divemployeesNone.appendChild(userOutOfWork)
    } else {
        const userDepartment = userData.department_id
        const department = await getDepartment(userDepartment)

        const divEmployeeCompany = document.createElement("div")
        const EmployeeCompany = document.createElement("h1")

        EmployeeCompany.innerText = `${department.company.name} - ${department.description}`

        divEmployeeCompany.classList.add("divEmployeeCompany")

        divEmployeeCompany.appendChild(EmployeeCompany)

        const employeesList = document.createElement("ul")
        employeesList.classList.add("employeesList")
        const listEmployeesCompany = department.employees

        listEmployeesCompany.forEach(e => {
            const employeesCard = document.createElement("li")

            employeesCard.innerText = e.name

            employeesCard.classList.add("employeesCard")
            employeesList.appendChild(employeesCard)
        }
        )

        employeesCompany.append(divEmployeeCompany, employeesList)

    }

}

export async function renderSelectCompanies() {
    const selectCompanies = document.querySelector("#selectCompanie")
    const companiesList = await getCompanies()

    companiesList.forEach(element => {
        const optionCompanie = document.createElement("option")

        optionCompanie.innerText = element.name
        optionCompanie.value = element.name

        selectCompanies.appendChild(optionCompanie)
    });
}

export async function renderDepartments() {
    const select = document.querySelector("#selectCompanie")
    const companies = await getCompanies()

    select.addEventListener("change", async (event) => {
        const selectValue = event.target.value

        const departmentList = document.querySelector(".departmentList")
        departmentList.innerHTML = ""
        const allDepartments = await getAllDepartments()

        if (selectValue == "") {
            departmentList.innerHTML = ""

            allDepartments.forEach(e => {
                const cardDep = document.createElement("li")
                const divInfos = document.createElement("div")
                const depName = document.createElement("h1")
                const depDescription = document.createElement("p")
                const companyName = document.createElement("p")
                const divButtons = document.createElement("div")
                const viewDep = document.createElement("img")
                const editDep = document.createElement("img")
                const deleteDep = document.createElement("img")

                const getCompanieById = companies.filter(com => com.id == e.company_id)
                const fiteredCompanieById = getCompanieById[0].name

                depName.innerText = e.name
                depDescription.innerText = e.description
                companyName.innerText = fiteredCompanieById
                viewDep.src = "../assets/img/Vector (4).png"
                editDep.src = "../assets/img/Vector (5).png"
                deleteDep.src = "../assets/img/Vector (6).png"

                cardDep.classList.add("cardDep")
                depName.classList.add("depName")
                depDescription.classList.add("depDescription")
                viewDep.classList.add("viewDep")
                editDep.classList.add("editDep")
                deleteDep.classList.add("deleteDep")
                divInfos.classList.add("divInfos")
                divButtons.classList.add("divButtons")

                departmentList.appendChild(cardDep)
                cardDep.append(divInfos, divButtons)
                divInfos.append(depName, depDescription, companyName)
                divButtons.append(viewDep, editDep, deleteDep)
            })
        } else {
            const departmentByCompanie = await getDepartmentsByCompanies(selectValue)
            departmentList.innerHTML = ""

            departmentByCompanie.forEach(e => {
                const cardDep = document.createElement("li")
                const divInfos = document.createElement("div")
                const depName = document.createElement("h1")
                const depDescription = document.createElement("p")
                const companyName = document.createElement("p")
                const divButtons = document.createElement("div")
                const viewDep = document.createElement("img")
                const editDep = document.createElement("img")
                const deleteDep = document.createElement("img")

                const getCompanieById = companies.filter(com => com.id == e.company_id)
                const fiteredCompanieById = getCompanieById[0].name

                depName.innerText = e.name
                depDescription.innerText = e.description
                companyName.innerText = fiteredCompanieById
                viewDep.src = "../assets/img/Vector (4).png"
                editDep.src = "../assets/img/Vector (5).png"
                deleteDep.src = "../assets/img/Vector (6).png"

                cardDep.classList.add("cardDep")
                depName.classList.add("depName")
                depDescription.classList.add("depDescription")
                viewDep.classList.add("viewDep")
                editDep.classList.add("editDep")
                deleteDep.classList.add("deleteDep")
                divInfos.classList.add("divInfos")
                divButtons.classList.add("divButtons")

                departmentList.appendChild(cardDep)
                cardDep.append(divInfos, divButtons)
                divInfos.append(depName, depDescription, companyName)
                divButtons.append(viewDep, editDep, deleteDep)
            })
        }
    })
}

export async function renderAllDepartments() {
    const departmentList = document.querySelector(".departmentList")
    departmentList.innerHTML = ""
    const allDepartments = await getAllDepartments()
    const companies = await getCompanies()

    allDepartments.forEach(e => {

        const cardDep = document.createElement("li")
        const divInfos = document.createElement("div")
        const depName = document.createElement("h1")
        const depDescription = document.createElement("p")
        const companyName = document.createElement("p")
        const divButtons = document.createElement("div")
        const viewDep = document.createElement("img")
        const editDep = document.createElement("img")
        const deleteDep = document.createElement("img")

        const getCompanieById = companies.filter(com => com.id == e.company_id)
        const fiteredCompanieById = getCompanieById[0].name

        depName.innerText = e.name
        depDescription.innerText = e.description
        companyName.innerText = fiteredCompanieById
        viewDep.src = "../assets/img/Vector (4).png"
        editDep.src = "../assets/img/Vector (5).png"
        deleteDep.src = "../assets/img/Vector (6).png"

        cardDep.classList.add("cardDep")
        depName.classList.add("depName")
        depDescription.classList.add("depDescription")
        viewDep.classList.add("viewDep")
        editDep.classList.add("editDep")
        deleteDep.classList.add("deleteDep")
        divInfos.classList.add("divInfos")
        divButtons.classList.add("divButtons")

        departmentList.appendChild(cardDep)
        cardDep.append(divInfos, divButtons)
        divInfos.append(depName, depDescription, companyName)
        divButtons.append(viewDep, editDep, deleteDep)
    })
}

export async function renderAllEmployees() {

    const allEmployees = await getAllEmployees()
    const departmentList = document.querySelector(".usersList")

    allEmployees.forEach(async e => {
        if(e.company_id == null){
        const cardUser = document.createElement("li")
        const divInfos = document.createElement("div")
        const userName = document.createElement("h1")
        const userCompanyName = document.createElement("p")
        const divButtons = document.createElement("div")
        const editUser = document.createElement("img")
        const deleteUser = document.createElement("img")

        userName.innerText = e.name
        userCompanyName.innerText = "Desempregado"
        editUser.src = "../assets/img/Vector (5).png"
        deleteUser.src = "../assets/img/Vector (6).png"

        cardUser.classList.add("cardUser")
        divInfos.classList.add("divInfos")
        userName.classList.add("userName")
        userCompanyName.classList.add("userCompanyName")
        divButtons.classList.add("divButtonsUser")
        editUser.classList.add("editUser")
        deleteUser.classList.add("deleteUser")

        departmentList.appendChild(cardUser)
        cardUser.append(divInfos, divButtons)
        divInfos.append(userName, userCompanyName)
        divButtons.append(editUser, deleteUser)
    } else {
        const companies = await getCompanies()
        const getUserCompany = companies.filter(company => company.id == e.company_id )
        const userCompany = getUserCompany[0].name

        const cardUser = document.createElement("li")
        const divInfos = document.createElement("div")
        const userName = document.createElement("h1")
        const userCompanyName = document.createElement("p")
        const divButtons = document.createElement("div")
        const editUser = document.createElement("img")
        const deleteUser = document.createElement("img")

        userName.innerText = e.name
        userCompanyName.innerText = userCompany
        editUser.src = "../assets/img/Vector (5).png"
        deleteUser.src = "../assets/img/Vector (6).png"

        
        cardUser.classList.add("cardUser")
        divInfos.classList.add("divInfos")
        userName.classList.add("userName")
        userCompanyName.classList.add("userCompanyName")
        divButtons.classList.add("divButtonsUser")
        editUser.classList.add("editUser")
        deleteUser.classList.add("deleteUser")

        departmentList.appendChild(cardUser)
        cardUser.append(divInfos, divButtons)
        divInfos.append(userName, userCompanyName)
        divButtons.append(editUser, deleteUser)
    }

    })
}
