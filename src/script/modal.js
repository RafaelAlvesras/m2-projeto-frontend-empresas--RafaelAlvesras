import { getAllDepartments, editDepartment, getAllEmployees, editEmployee } from "./requests.js"

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
      
      const closeModalEditDep =document.querySelector(".closeModalEditEmp")
      closeModalEditDep.addEventListener("click", () => {
        modalEdit.close()
      })

      saveEdit.addEventListener("click",async () => {
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
      const allEmployees = await getAllEmployees()

      const employeeFiltered = allEmployees.filter(dep => e.id == dep.id)
      const employeeId = employeeFiltered[0].id
      
      const closeModalEditEmp = document.querySelector(".closeModalEditEmp")
      closeModalEditEmp.addEventListener("click", () => {
        modalEdit.close()
      })

      saveEdit.addEventListener("click",async () => {
        const updateEmployee = {
          name: inputEditEmployeename.value,
          email: inputEditEmployeeEmail.value,
        }

        await editEmployee(updateEmployee, employeeId)
        await getAllEmployees()
        modalEdit.close()
        window.location.replace("../pages/adminPage.html")
      })
    })
  })
}


