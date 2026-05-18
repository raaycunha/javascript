const quantityInput = document.querySelector('input#inQuantity')
const unitSelect = document.querySelector('select#inUnit')
const convertSelect = document.querySelector('select#inConvert')
const respConvert = document.querySelector('.resp-convert')
const btnConvert = document.querySelector('#btnConvert')

const focusInput = () => {
    quantityInput.focus()
    quantityInput.select() 
}

btnConvert.addEventListener('click', () => {
    if (quantityInput.value.trim().length < 1) {
        alert('O campo não pode estar vazio.')
        focusInput()
        respConvert.textContent = ''
        return
    }

    const quantityUser = Number(quantityInput.value)

    const unitValue = unitSelect.value.toUpperCase()
    const convertValue = convertSelect.value.toUpperCase()

    const nameUnit = unitSelect.querySelector('option:checked').dataset.name
    const nameConvert = convertSelect.querySelector('option:checked').dataset.name

    let total = 0

    if (unitValue === 'M') {
        if (convertValue === 'M') total = quantityUser
        else if (convertValue === 'KM') total = quantityUser / 1000
        else if (convertValue === 'CM') total = quantityUser * 100
        else total = quantityUser * 1000
    } 

    else if (unitValue === 'KM') {
        if (convertValue === 'KM') total = quantityUser
        else if (convertValue === 'M') total = quantityUser * 1000
        else if (convertValue === 'CM') total = quantityUser * 100000
        else total = quantityUser * 1000000
    } 

    else if (unitValue === 'CM') {
        if (convertValue === 'CM') total = quantityUser
        else if (convertValue === 'M') total = quantityUser / 100
        else if (convertValue === 'KM') total = quantityUser / 100000
        else total = quantityUser * 10
    } 

    else {
        if (convertValue === 'MM') total = quantityUser
        else if (convertValue === 'M') total = quantityUser / 1000
        else if (convertValue === 'KM') total = quantityUser / 1000000
        else total = quantityUser / 10
    }

    const quantityFormat = quantityUser.toLocaleString('pt-BR')
    const totalFormat = total.toLocaleString('pt-BR', { maximumFractionDigits: 6 })

    respConvert.textContent = `${quantityFormat} ${nameUnit} convertidos para ${nameConvert} = ${totalFormat}`
    focusInput()
})