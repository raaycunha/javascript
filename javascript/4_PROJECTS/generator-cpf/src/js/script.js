const outputCpf = document.querySelector('.output-cpf')
const btnCopy = document.querySelector('#btnCopy')
const btnGenerate = document.querySelector('#btnGenerate')

const generateCpf = () => {
    let numeros = []
    for (let i = 0; i < 11; i++) {
        numeros.push(Math.floor(Math.random() * 10))
    }
    const c = numeros.join('')
    return `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6, 9)}-${c.slice(9, 11)}`
}



btnGenerate.addEventListener('click', () => {
    btnGenerate.disabled = true
    btnGenerate.textContent = 'Gerando...'
    setTimeout(() => {
        outputCpf.textContent = generateCpf()
        btnGenerate.disabled = false
        btnGenerate.textContent = 'Gerar CPF'
    }, 500)
})

btnCopy.addEventListener('click', async () => {
    if (outputCpf.textContent === '') {
        alert('Gere um CPF primeiro!')
        return
    }

    try {
        const cpfText = outputCpf.textContent
        await navigator.clipboard.writeText(cpfText)
        
        btnCopy.textContent = 'Copiado!'
        
        setTimeout(() => {
            btnCopy.textContent = 'Copiar CPF'
        }, 500)
    } catch (err) {
        console.error('Erro ao copiar:', err)
        alert('Não foi possível copiar o código automaticamente.')
    }
})