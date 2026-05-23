const allInput = document.querySelectorAll('.input-form')
const textWarning = document.querySelectorAll('.warning')
const btnSubmit = document.querySelector('#btnSubmit')

// Array com estado do input
let inputCompleted = [
    { type: 'name', completed: false },
    { type: 'email', completed: false },
    { type: 'subject', completed: false },
    { type: 'message', completed: false }
]

const validatorInput = (text, type, index) => {
    // Verificando se os inputs estão escritos de forma correta
    const regex = {
        text: /^[a-zA-ZÀ-ÿ0-9]{3,20}(\s[a-zA-ZÀ-ÿ0-9]{3,20})*$/,
        email: /^[a-zA-Z0-9._%+-]{3,30}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: /^[\s\S]{15,}$/
    }
    // Atualiza o estado do input caso esteja correto
    const inputCorrect = () => {
        inputCompleted[index].completed = true
        allInput[index].style.border = 'none'
        textWarning[index].textContent = ''
    }
    // Caso os inputs estejam incorretos
    const inputIncorrect = (textError) => {
        inputCompleted[index].completed = false
        textWarning[index].textContent = textError
        allInput[index].style.border = '1px solid red'
    }
    // Verifica o input Nome
    if (type === 'name') {
        if (text === '') inputIncorrect('Nome não pode ficar em branco')
        else if (!regex.text.test(text)) inputIncorrect('Nome inválido')
        else inputCorrect()
    } 
    // Verifica o input E-mail
    else if (type === 'email') {
        if (text === '') inputIncorrect('E-mail não pode ficar em branco')
        else if (!regex.email.test(text)) inputIncorrect('E-mail inválido')
        else inputCorrect()
    }
    // Verifica o input Assunto
    else if (type === 'subject') {
        if (text === '') inputIncorrect('Assunto não pode ficar em branco')
        else if (!regex.text.test(text)) inputIncorrect('Assunto inválido')
        else inputCorrect()
    }
    // Verifica o input Mensagem
    else if (type === 'message') {
        if (text === '') inputIncorrect('Mensagem não pode ficar em branco')
        else if (!regex.message.test(text)) inputIncorrect('Mensagem inválida')
        else inputCorrect()
    }
}

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    try {
        btnSubmit.disabled = true
        btnSubmit.textContent = 'Enviando...'
        // Loop para adicionar todos os inputs dentro da Array 'inputList'
        allInput.forEach((input, index) => {
            input.value = input.value.trim()
            const inputValue = input.value
            const type = input.dataset.type
            validatorInput(inputValue, type, index)
        })
        // Verificar se todos inputs estão corretos
        const isCompleted = inputCompleted.every(item => item.completed === true)
        if (isCompleted) {
            allInput.forEach(input => {
                input.value = ''
                input.style.border = 'none'
            })
            textWarning.forEach((text => text.textContent = ''))
            // Limpa a Array para o proximo envio
            inputCompleted.forEach(item => item.completed = false)
            alert('Formulário enviado com sucesso!')
            // Caso não estiver todos inputs corretos, retorna
        } else {
            const firstError = inputCompleted.findIndex(item => item.completed === false)
            if (firstError !== -1) allInput[firstError].focus()
        }
    } catch(err) {
        console.error('Erro mais detalhado:', err)
        alert('Ocorreu um erro ao enviar o formulário. Tente novamente!')
    } finally {
        btnSubmit.disabled = false
        btnSubmit.textContent = 'Enviar'
    }
    
})

allInput.forEach(input => {
    // Caso input esteja em foco fica com borda escura
    input.addEventListener('focus', () => {
        input.style.outline = '1px solid #3a3a3a96'
    })
    // Caso input esteja fora de foco fica com borda que está no CSS
    input.addEventListener('blur', () => {
        input.style.outline = '1px solid #bbb'
    })
})