const boxNumbers = document.querySelectorAll('.number-drawn')
const btnGenerate = document.querySelector('#btnGenerate')

let numbersDrawn = []

btnGenerate.addEventListener('click', () => {
    boxNumbers.forEach(box => box.textContent = '')
    numbersDrawn = []
    while (numbersDrawn.length < 6) {
        const drawnNumber = Math.floor(Math.random() * 60) + 1
        if (!numbersDrawn.includes(drawnNumber)) numbersDrawn.push(drawnNumber)
    }
    numbersDrawn.sort((a, b) => a - b)
    for (let i = 0; i < numbersDrawn.length; i++) {
        boxNumbers[i].textContent = numbersDrawn[i]
    }
})