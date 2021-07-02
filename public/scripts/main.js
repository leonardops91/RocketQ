import Modal from './modal.js'

const modal = Modal()

const checkButtons = document.querySelectorAll('.actions a.check')

checkButtons.forEach(button => {
    button.addEventListener('click', handleClick
    )
})

const deleteButtons = document.querySelectorAll('.actions a.delete')

deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => handleClick(event, false))
})

const modalTittle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

function handleClick(event, check = true) {
    event.preventDefault()
    prepareForm(event, check);

    const text = check ? "Marcar como lida" : "Excluir"
    modalTittle.innerHTML = `${text}`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${check ? "marcar" : "excluir"}`
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")

    modal.open()
}

function prepareForm(event, check) {
    const form = document.querySelector('.modal form')
    const roomId = document.querySelector('#room-id').dataset.id
    const questionId = event.target.dataset.id
    const slug = check ? "check" : "delete"
    form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)
}