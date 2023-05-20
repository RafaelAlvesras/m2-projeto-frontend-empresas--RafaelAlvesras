import { getAllDepartments, getCompanies, editDepartment, getAllEmployees, editEmployee, getEmployeesOutOfWork, hireEmployee, dismissEmployee } from "./requests.js"
import { renderAllEmployees} from "./render.js"

import { toast, green } from "./toast.js"

export function openModalCreateDep() {
  const createModalButton = document.querySelector(".createDepButton")

  createModalButton.addEventListener("click", () => {
    const modal = document.querySelector(".ModalCreateDepartment")
    if (!modal.hasAttribute("open")) {
      if (!modal.showModal) {
        dialogPolyfill.registerDialog(modal);
      }

      modal.showModal();
    }
    closeModal()
  })

}

function closeModal() {
  const createDepCloseButton = document.querySelector(".createDepCloseButton")
  const modal = document.querySelector(".ModalCreateDepartment")
  createDepCloseButton.addEventListener("click", () => {
    modal.close()
  })
}

export function editDepartmentModal() {
  const buttonEditDep = document.querySelectorAll(".editDep")
  const modalEdit = document.querySelector(".ModalEditDep")

  buttonEditDep.forEach(e => {

    e.addEventListener("click", async () => {
      modalEdit.showModal()
      const inputEditDep = document.querySelector(".inputEditDep")
      const saveEdit = document.querySelector(".editDepButton")
      const departments = await getAllDepartments()

      const departmentFiltered = departments.filter(dep => e.id == dep.id)
      const depName = departmentFiltered[0].depName
      const departmentId = departmentFiltered[0].id

      const closeModalEditDep = document.querySelector("#closeModalEditDep")
      closeModalEditDep.addEventListener("click", () => {
        modalEdit.close()
      })

      saveEdit.addEventListener("click", async () => {
        const updateDep = {
          description: inputEditDep.value,
          name: depName
        }
        await editDepartment(updateDep, departmentId)
        await getAllDepartments()
        modalEdit.close()
        window.location.replace("../pages/adminPage.html")
      })
    })
  })
}

export function editEmployeeModal() {
  const buttonEditEmployee = document.querySelectorAll(".editUser")
  const modalEdit = document.querySelector(".ModalEditEmployee")

  buttonEditEmployee.forEach(e => {

    e.addEventListener("click", async () => {
      modalEdit.showModal()
      const inputEditEmployeename = document.querySelector("#inputEditEmployeename")
      const inputEditEmployeeEmail = document.querySelector("#inputEditEmployeeEmail")

      const saveEdit = document.querySelector(".editEmployeeButton")

      const closeModalEditEmp = document.querySelector(".closeModalEditEmp")
      closeModalEditEmp.addEventListener("click", () => {
        modalEdit.close()
      })

      saveEdit.addEventListener("click", async () => {
        const allEmployees = await getAllEmployees()

        const employeeFiltered = allEmployees.filter(dep => e.id == dep.id)
        const employeeId = employeeFiltered[0].id
        
        const updateEmployee = {
          name: inputEditEmployeename.value,
          email: inputEditEmployeeEmail.value
        }

        await editEmployee(updateEmployee, employeeId)
        await renderAllEmployees()
        modalEdit.close()
        toast(green, "Perfil atualizado com sucesso !")
        setTimeout(async () => {        
          window.location.replace("../pages/adminPage.html")
        }, 1500)        
      })
    })
  })
}

async function selectEmployeeOutOfWork() {

  const selectHireEmployee = document.querySelector("#selectHireEmployee")
  const employeesOutOfWork = await getEmployeesOutOfWork()

  employeesOutOfWork.forEach(e => {
    const option = document.createElement("option")
    option.innerText = e.name
    option.value = e.id
    selectHireEmployee.appendChild(option)
  })
}

export async function viewDepModal() {
  const buttonViewDep = document.querySelectorAll(".viewDep")
  const modalView = document.querySelector(".viewDepModal")

  await selectEmployeeOutOfWork()

  buttonViewDep.forEach((btn) => {
    btn.addEventListener("click", async () => {

      modalView.showModal()
      const ulEmployees = document.querySelector(".ulEmployees")
      ulEmployees.innerHTML = ""


      const departments = await getAllDepartments()
      const checkDepName = departments.filter(e => e.id == btn.id)
      const depName = checkDepName[0].name
      const depDescription = checkDepName[0].description
      const depID = checkDepName[0].id
      await getEmployeesDepartment(depID)

      const closeModalView = document.querySelector(".closeModalView")
      closeModalView.addEventListener("click", () => {
        modalView.close()
      })

      const depNameModalView = document.querySelector(".depNameModalView")
      const depDescriptionModalView = document.querySelector(".depDescriptionModalView")
      const companyNameModalView = document.querySelector(".companyNameModalView")
      const companies = await getCompanies()

      const checkCompanyName = companies.filter(e => e.id == checkDepName[0].company_id)

      depNameModalView.innerText = depName
      depDescriptionModalView.innerText = depDescription
      companyNameModalView.innerText = checkCompanyName[0].name

      const selectHireEmployee = document.querySelector("#selectHireEmployee")
      selectHireEmployee.addEventListener("change", (event) => {
        const selectValue = event.target.value

        const bodyHire = {
          department_id: depID
        }

        const HireEmployee = document.querySelector(".HireEmployee")

        HireEmployee.addEventListener("click", async () => {
          await hireEmployee(bodyHire, selectValue)
          toast(green, "Funcionário contratado com sucesso !")
          setTimeout(async () => {
            await getEmployeesDepartment(depID)
            await selectEmployeeOutOfWork()
          }, 1500)
        })
      })
    })
  })
}

async function getEmployeesDepartment(departmentID) {
  const ulEmployees = document.querySelector(".ulEmployees")
  ulEmployees.innerHTML = ""
  const employees = await getAllEmployees()
  const companies = await getCompanies()

  const employeesDep = employees.filter(e => e.department_id == departmentID)

  if (employeesDep.length == 0) {
    const card = document.createElement("li")
    const noEmployee = document.createElement("h1")

    noEmployee.innerText = "ainda não contratou nenhum funcionário"
    card.classList.add("cardNoEmployeeModalView")

    card.appendChild(noEmployee)
    ulEmployees.appendChild(card)
  } else {

    employeesDep.forEach(e => {
      const card = document.createElement("li")
      const nameEmployee = document.createElement("h1")
      const companyEmployee = document.createElement("p")
      const buttonDismiss = document.createElement("button")

      const checkCompany = companies.filter(company => company.id == e.company_id)
      const companyName = checkCompany[0].name

      nameEmployee.innerText = e.name
      companyEmployee.innerText = companyName
      buttonDismiss.innerText = "Desligar"

      card.classList.add("cardEmployeeModalView")
      nameEmployee.classList.add("nameEmployeeModalView")
      companyEmployee.classList.add("companyEmployeeModalView")
      buttonDismiss.classList.add("buttonDismissModalView")

      card.append(nameEmployee, companyEmployee, buttonDismiss)
      ulEmployees.appendChild(card)

      buttonDismiss.addEventListener("click", async () => {
        const employeeId = e.id
        await dismissEmployee(employeeId)
        toast(green, "Funcionário demitido com sucesso !")
        setTimeout(async () => {
          await selectEmployeeOutOfWork()
          location.reload()
        }, 1500)
      })
    })
  }

}  
