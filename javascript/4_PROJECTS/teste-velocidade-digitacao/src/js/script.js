const boxText = document.querySelector('#textForUser')
const textarea = document.querySelector('#entry')
const boxRes = document.querySelector('#boxRes')
const boxHistory = document.querySelector('#history')
const btnTheme = document.querySelector('#btnTheme')
const btnRestart = document.querySelector('#btnRestart')

let isDark = JSON.parse(localStorage.getItem('theme')) || false
document.body.className = isDark ? 'dark' : 'light'

let quote = ''
const textGenerated = async () => {
    try {
        if (quote !== '') return
        const randomId = Math.floor(Math.random() * 224)
        const url = `https://api.adviceslip.com/advice/${randomId}`
        const response = await fetch(url)
        const data = await response.json()
        quote = data.slip.advice
        boxText.textContent = quote
    } catch (err) {
        console.error('Erro detalhado:', err)
    }
}

btnRestart.addEventListener('click', () => {
    textarea.value = ''
    boxHistory.textContent = ''
    boxRes.textContent = ''
    boxText.textContent = ''
    quote = ''
    seconds = 0
    minutes = 0
    hours = 0
    textGenerated()
})

btnTheme.addEventListener('click', () => {
    isDark = !isDark
    document.body.className = isDark ? 'dark' : 'light'
    localStorage.setItem('theme', JSON.stringify(isDark))
})

let alarme
let seconds = 0
let minutes = 0
let hours = 0
textarea.addEventListener('focus', () => {
    alarme = setInterval(() => {
        if (seconds === 60) {
            minutes++
            seconds = 0
        }
        if (minutes === 60) {
            hours++
            minutes = 0
        }
        seconds++
    }, 1000)
})

let history = ''
textarea.addEventListener('input', () => {
    const textUser = textarea.value
    if (textUser === quote) {
        setTimeout(() => {
            clearInterval(alarme)
            const tempoAtual = Date.now();
            const h = String(hours).padStart(2, '0')
            const m = String(minutes).padStart(2, '0')
            const s = String(seconds).padStart(2, '0')
            boxRes.textContent = `Texto: '${quote}' - Tempo: ${h}:${m}:${s}`
            if (history !== '') boxHistory.textContent = history
            history += `Texto: '${quote}' - Tempo: ${h}:${m}:${s}\n`
            boxText.textContent = ''
            textarea.value = ''
            quote = ''
            seconds = 0
            minutes = 0
            hours = 0
            textGenerated()
        }, 10)
    }
})

textGenerated()