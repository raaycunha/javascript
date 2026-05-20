const progressBar = document.querySelector('.progress-bar')
const btnBack = document.querySelector('#btnBack')
const btnNext = document.querySelector('#btnNext')
let progress = 0

function updateProgressBar(btn, bar) {
    if (btn === 'Próximo') {
        progress += 20
        if (progress >= 100) progress = 100
    } else {
        progress -= 20
        if (progress <= 0) progress = 0
    }
    bar.style.width = `${progress}%`
}

function barProgress(btnMain, btnTwo) {
    if (btnMain === btnBack && progress === 0) return

    const textBtn = btnMain.textContent
    btnMain.disabled = true
    btnTwo.disabled = true
    btnMain.textContent = 'Carregando...'
    setTimeout(() => {
        btnMain.disabled = false
        btnTwo.disabled = false
        btnMain.textContent = textBtn
        updateProgressBar(textBtn, progressBar)
    }, 300)
}

btnNext.addEventListener('click', () => barProgress(btnNext, btnBack))
btnBack.addEventListener('click', () => barProgress(btnBack, btnNext))