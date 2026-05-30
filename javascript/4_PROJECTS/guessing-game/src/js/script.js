const selectInput = document.querySelector('#inDifficulty')
const btnSend = document.querySelector('#btnSend')
const btnRestart = document.querySelector('#btnRestart')
const gameMenu = document.querySelector('.game-menu')
const containerGame = document.querySelector('.container-game')
const inputTry = document.querySelector('input#inGuess')
const tips = document.querySelector('.tips')
const tryScore = document.querySelector('#tryScore')

let attempts = 0
let totalAttempts = 0
let numRandom = 0

const attempsValidator = (text, stop) => {
    if (stop) {
        tips.textContent = text
        btnRestart.style.display = 'block'
    } else {
        tips.textContent = ''
        tips.textContent = text
        attempts--
        totalAttempts++
    }
    cleanInput()
}

const cleanInput = () => {
    inputTry.value = ''
    inputTry.focus()
}

const playGame = () => {
    if (inputTry.value === '') {
        alert('Digite um número de 1 a 100!')
        inputTry.focus()
        return
    }
    const tryUser = Number(inputTry.value)
    if (tryUser < 1 || tryUser > 100) {
        alert('Digite um número de 1 a 100!')
        inputTry.focus()
        return
    }
    if (numRandom === 0) numRandom = Math.floor(Math.random() * 100) + 1
    if (tryUser > numRandom) attempsValidator(`Abaixo de ${tryUser}. Tente novamente!`)
    else if (tryUser < numRandom) attempsValidator(`Acima de ${tryUser}. Tente novamente!`)
    else {
        attempsValidator(`Parabéns, você acertou em ${totalAttempts} tentativas!`, true)
        return
    }
    if (attempts === 0) attempsValidator(`Suas tentativas acabaram! O número correto era ${numRandom}`, true)
    tryScore.textContent = attempts
}

btnSend.addEventListener('click', playGame)

inputTry.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') playGame()
})

selectInput.addEventListener('change', () => {
    attempts = Number(selectInput.value)
    tryScore.textContent = attempts
    gameMenu.style.display = 'none'
    containerGame.style.display = 'flex'
})

btnRestart.addEventListener('click', () => {
    btnRestart.style.display = 'none'
    attempts = 0
    totalAttempts = 0
    numRandom = 0
    selectInput.selectedIndex = 0
    cleanInput()
    gameMenu.style.display = 'flex'
    containerGame.style.display = 'none'
    tips.textContent = ''
})