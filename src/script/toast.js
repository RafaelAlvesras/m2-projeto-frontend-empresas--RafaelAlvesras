/* utilizando o modelo do Rafael Bertoldo
   conforme autorizado em demo
*/

export function toast(color, text) {
    const toastContainer = document.querySelector('.toast__container')
    const toastParagraph = document.querySelector('.toast__container > p')

    toastParagraph.innerText = text

    toastContainer.style = `background-color: ${color}; border-color: ${color}`

    toastContainer.classList.remove('hidden')
}