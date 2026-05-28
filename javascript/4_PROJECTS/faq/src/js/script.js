const allBox = document.querySelectorAll('.ask-content')
const btnFaq = document.querySelectorAll('.btn-ask')
let indexOpen = -1
let isLock = false
btnFaq.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (isLock === false && indexOpen === -1) {
            indexOpen = index
            btn.classList.add('active')
        } else if (isLock === true && indexOpen !== index) {
            btnFaq[indexOpen].classList.remove('active')
            btn.classList.add('active')
            indexOpen = index
        } else {
            btn.classList.remove('active')
            indexOpen = -1
        }
        isLock = indexOpen !== -1 ? true : false
    })
})