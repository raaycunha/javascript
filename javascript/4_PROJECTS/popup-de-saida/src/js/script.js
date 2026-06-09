const mainContainer = document.querySelector('.main-container')
const popUp = document.querySelector('.container-popup')
const btnReturn = document.querySelector('#btnReturn')

let showingPopup = false

const showPopup = () => {
    mainContainer.style.display = 'none'
    popUp.style.display = 'flex'
    document.body.classList.add('pop-active')
    document.body.style.display = 'flex'
}

document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 20 && !showingPopup) {
        showPopup()
        showingPopup = true
    }
})

btnReturn.addEventListener('click', () => {
    mainContainer.style.display = 'block'
    popUp.style.display = 'none'
    document.body.classList.remove('pop-active')
})