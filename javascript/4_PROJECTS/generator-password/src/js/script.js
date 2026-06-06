const allInput = document.querySelectorAll('input')
const boxPass = document.querySelector('.box-pass')
const btnPass = document.querySelector('#btnPass')
const spanNewPass = document.querySelector('#newPass')
const passInput = document.querySelector('#inPass')
const btnSign = document.querySelector('#btnSign')

btnPass.addEventListener('click', () => {
    const newPass = crypto.randomUUID()
    boxPass.style.display = 'flex'
    spanNewPass.textContent = newPass
})

btnSign.addEventListener('click', () => {
    boxPass.style.display = 'none'
    allInput.forEach(input => {
        input.value = ''
    })
})