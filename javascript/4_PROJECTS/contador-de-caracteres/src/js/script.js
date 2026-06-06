const textArea = document.querySelector('#input')
const counterText = document.querySelector('#counter')
const btnToggle = document.querySelector('#btnToggle')

let whatCounter = false
btnToggle.addEventListener('click', () => {
    whatCounter = !whatCounter
    if (whatCounter) {
        btnToggle.textContent = 'Contar caractere(s)'
        counterText.textContent = '0 palavra(s)'
    } else {
        btnToggle.textContent = 'Contar palavra(s)'
        counterText.textContent = '0 caractere(s)'
    }
    textArea.value = ''
    textArea.focus()
})

const counterPalavras = (text, counter) => {
    if (counter) {
        const textClean = text.trim()
        if (textClean === '') {
            counterText.textContent = '0 palavra(s)'
            return
        }
        const correspondencias = textClean.match(/\b\w+\b/g)
        const palavrasTotal = correspondencias ? correspondencias.length : 0
        counterText.textContent = `${palavrasTotal} palavra(s)`
    } else if (!counter) {
        const caracteresTotal = text.length
        counterText.textContent = `${caracteresTotal} caractere(s)`
    }
}

textArea.addEventListener('input', () => {
    const textUser = textArea.value
    counterPalavras(textUser, whatCounter)
})