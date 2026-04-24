const heightInput = document.querySelector('input#inHeight')
const weightInput = document.querySelector('input#inWeight')
const mainContainer = document.querySelector('.main-container')
const resContainer = document.querySelector('.res-container')
const btnCalculate = document.querySelector('#btnCalculate')
const btnClear = document.querySelector('#btnClear')
const btnBack = document.querySelector('#btnBack')

limparInput = () => {
    heightInput.value = ''
    weightInput.value = ''
    heightInput.focus()
}

btnCalculate.addEventListener('click', () => {
    if (heightInput.value < 0.40 || weightInput.value < 1) {
        alert('Os valores não podem ser tão baixos para um humano.')
        return
    }

    const heightUser = Number(heightInput.value)
    const weightUser = Number(weightInput.value)

    const calculo = heightUser * heightUser
    const imc = (weightUser / calculo).toFixed(1)

    const resImc = document.querySelector('span#imcUser')
    resImc.textContent = imc

    const resSituation = document.querySelector('span#situationUser')

    switch (true) {
        case (imc < 18.5):
            resSituation.textContent = 'Magreza'
            break
        case (imc >= 18.5 && imc <= 24.9):
            resSituation.textContent = 'Normal'
            break
        case (imc >= 25.0 && imc <= 29.9):
            resSituation.textContent = 'Sobrepeso'
            break
        case (imc >= 30.0 && imc <= 39.9):
            resSituation.textContent = 'Obesidade'
            break
        default:
            resSituation.textContent = 'Obesidade grave'
    }

    mainContainer.style.display = 'none';
    resContainer.style.display = 'flex';
})

btnClear.addEventListener('click', () => {
    if (heightInput.value === '' && weightInput.value === '') {
        alert('Você não consegue limpar algo que ja está limpo..')
        return
    }

    limparInput()
})

btnBack.addEventListener('click', () => {
    mainContainer.style.display = 'flex';
    resContainer.style.display = 'none';

    limparInput()
})