const boxText = document.querySelector('#textForUser')
const textarea = document.querySelector('#entry')
const boxRes = document.querySelector('#boxRes')
const boxHistory = document.querySelector('#history')
const btnTheme = document.querySelector('#btnTheme')
const btnRestart = document.querySelector('#btnRestart')

let isDark = JSON.parse(localStorage.getItem('theme')) || false
document.body.className = isDark ? 'dark' : 'light'

let quote = ''
let alarme = null
let seconds = 0
let minutes = 0
let hours = 0
let history = ''

const textGenerated = async () => {
    try {
        if (quote !== '') return
        const randomId = Math.floor(Math.random() * 224) + 1
        const url = `https://api.adviceslip.com/advice/${randomId}`
        const response = await fetch(url)
        const data = await response.json()
        if (data.message && data.message.type === 'error') {
            return textGenerated()
        }  
        quote = data.slip.advice
        boxText.textContent = quote
    } catch (err) {
        console.error('Erro detalhado:', err)
    }
}

const resetarCronometro = () => {
    if (alarme) {
        clearInterval(alarme)
        alarme = null
    }
    seconds = 0
    minutes = 0
    hours = 0
}

btnRestart.addEventListener('click', () => {
    textarea.value = ''
    boxHistory.textContent = ''
    boxRes.textContent = ''
    boxText.textContent = ''
    quote = ''
    history = ''
    restartTimer()
    textGenerated()
})

btnTheme.addEventListener('click', () => {
    isDark = !isDark
    document.body.className = isDark ? 'dark' : 'light'
    localStorage.setItem('theme', JSON.stringify(isDark))
})

textarea.addEventListener('focus', () => {
    if (alarme) return 
    alarme = setInterval(() => {
        seconds++
        if (seconds === 60) {
            minutes++
            seconds = 0
        }
        if (minutes === 60) {
            hours++
            minutes = 0
        }
    }, 1000)
})

textarea.addEventListener('input', () => {
    const textUser = textarea.value
    if (textUser === quote) {
        setTimeout(() => {
            clearInterval(alarme)
            alarme = null 
            const h = String(hours).padStart(2, '0')
            const m = String(minutes).padStart(2, '0')
            const s = String(seconds).padStart(2, '0')
            const formated = `Texto: '${quote}' - Tempo: ${h}:${m}:${s}`
            boxRes.textContent = formated
            history += `${formatado}\n`
            boxHistory.textContent = history
            boxText.textContent = ''
            textarea.value = ''
            quote = ''
            restartTimer()
            textGenerated()
        }, 10)
    }
})

textGenerated()