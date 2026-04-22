const primaryNumInput = document.querySelector('#primaryNum')
const secondNumInput = document.querySelector('#secondNum')
const boxRes = document.querySelector('.res-tabuada')
const btnCalcular = document.querySelector('#btnCalcular')

const limparInput = () => {
    primaryNumInput.value = ''
    secondNumInput.value = ''
    primaryNumInput.focus()
}

btnCalcular.addEventListener('click', () => {
    debugger;
    boxRes.style.color = 'Black'
    const primaryUser = Number(primaryNumInput.value)
    const secondUser = Number(secondNumInput.value)

    if (primaryUser < 1 || secondUser < 1) {
        boxRes.textContent = 'Os números não podem ser negativos ou 0.'
        boxRes.style.color = 'Red'
        limparInput()
        return
    } else if (primaryUser > 10) {
        boxRes.textContent = 'O número referencia não pode ser acima de 10.'
        boxRes.style.color = 'Red'
        limparInput()
        return
    }

    let res = ''

    for (let i = 1; i <= secondUser; i++) {
        const calculo = primaryUser * i
        res += `${primaryUser} x ${i} = ${calculo} <br>`
    }
    
    boxRes.innerHTML = res
})