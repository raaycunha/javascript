const accountInput = document.querySelector('#inValue')
const serviceInput = document.querySelector('#inService')
const allCardTip = document.querySelectorAll('.card-tip')
const btnCalculate = document.querySelector('#btnCalculate')

const cleanInput = () => {
    accountInput.value = ''
    accountInput.focus()
}

const calculateTip = (accountValue, service) => {
    return (accountValue * service) / 100
}

btnCalculate.addEventListener('click', () => {
    try {
        btnCalculate.disabled = true
        btnCalculate.textContent = 'Calculando...'
        const valueAccount = Number(accountInput.value)
        const serviceOption = serviceInput.value
        if (valueAccount <= 0) {
            alert('Digite o valor da conta primeiro!')
            cleanInput()
            return
        } else if (valueAccount > 0 && valueAccount < 25) {
            alert('O prato mais barato é de R$25.00!')
            cleanInput()
            return
        }
        const tip = calculateTip(valueAccount, serviceOption)
        const total = valueAccount + tip
        allCardTip[0].textContent = `${tip.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })}`
        allCardTip[1].textContent = `${total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })}`
    } catch (err) {
        alert('Erro ao calcular o valor da gorjeta!')
        console.error('Erro detalhado:', err)
    } finally {
        btnCalculate.disabled = false
        btnCalculate.textContent = 'Calcular Gorjeta'
    }
})