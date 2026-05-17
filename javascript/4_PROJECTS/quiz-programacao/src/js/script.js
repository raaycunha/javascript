const menuContainer = document.querySelector('.menu-container')
const mainQuizContainer = document.querySelector('.container-quiz')
const containerFinally = document.querySelector('.container-finally')
const respHits = document.querySelector('#hitsQuiz')
const porcentQuiz = document.querySelector('#porcentQuiz')
const btnStart = document.querySelector('#btnStart')
const btnRestart = document.querySelector('#btnRestart')
const allBox = document.querySelectorAll('.quiz')

let hitsQuiz = 0

btnStart.addEventListener('click', () => {
    menuContainer.style.display = 'none'
    mainQuizContainer.style.display = 'block'
    allBox[0].style.display = 'block'
})

btnRestart.addEventListener('click', () => {
    debugger
    const allOptions = document.querySelectorAll('.list-quiz p')
    allOptions.forEach(option => {
        option.classList.remove('is-correct')
        option.classList.remove('is-incorrect')
    })
    menuContainer.style.display = 'none'
    mainQuizContainer.style.display = 'block'
    containerFinally.style.display = 'none'
    allBox.forEach(box => box.style.display = 'none')
    allBox[0].style.display = 'block'
    hitsQuiz = 0
})

allBox.forEach((box, index) => {
    const boxOptions = box.querySelectorAll('p')
    boxOptions.forEach(paragrafo => {
        paragrafo.addEventListener('click', (e) => {
            box.style.pointerEvents = 'none'
            if (e.target.classList.contains('correct')) hitsQuiz++
            const proxBox = allBox[index + 1] || false
            clickUser(boxOptions, box, proxBox)
        })
    })
})

function clickUser(listOption, containerAtual, containerProx) {
    for (const option of listOption) {
        if (option.classList.contains('correct')) {
            option.classList.add('is-correct')
        } else option.classList.add('is-incorrect')
    }
    setTimeout(() => {
        containerAtual.style.display = 'none'
        if (containerProx === false) {
            finishQuiz()
            mainQuizContainer.style.display = 'none'
            containerFinally.style.display = 'flex'
        }
        else containerProx.style.display = 'block'
    }, 1000)
}

function finishQuiz() {
    const calculo = (hitsQuiz / allBox.length) * 100
    porcentQuiz.textContent = `${calculo.toFixed(2)}%`
    respHits.textContent = `${hitsQuiz} de ${allBox.length}`
}