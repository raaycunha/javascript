const btnPlayer = document.querySelector('#btnPlayer')
const btnInteligency = document.querySelector('#btnInteligency')
const xCheck = document.querySelector('.x-check')
const oCheck = document.querySelector('.o-check')
const containerTicTac = document.querySelector('.container-tic-tac')
const containerScoreboard = document.querySelector('.container-scoreboard')
const allBox = document.querySelectorAll('.tic-tac')

const disabledBtn = () => {
    btnPlayer.style.display = 'none'
    btnInteligency.style.display = 'none'
    containerTicTac.style.display = 'grid'
    containerScoreboard.style.display = 'flex'
}

const resetGame = () => {
    xCheckTotal = 0
    oCheckTotal = 0
    vezDoX = true
    xCheck.textContent = '0'
    oCheck.textContent = '0'
    allBox.forEach(box => box.textContent = '')
}

const checkWin = () => {
    const combinationWin = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    return combinationWin.some(combinacao => {
        const [a, b, c] = combinacao
        return allBox[a].textContent !== '' &&
        allBox[a].textContent === allBox[b].textContent &&
        allBox[a].textContent === allBox[c].textContent
    })
}

let xCheckTotal = 0
let oCheckTotal = 0
let vezDoX = true

btnPlayer.addEventListener('click', () => {
    disabledBtn()

    allBox.forEach(box => {
        box.addEventListener('click', () => {
            if (box.textContent !== '') return
            if (vezDoX) {
                box.style.color = 'Red'
                box.textContent = 'X'
                xCheckTotal++
                xCheck.textContent = xCheckTotal
            } else {
                box.style.color = 'Green'
                box.textContent = 'O'
                oCheckTotal++
                oCheck.textContent = oCheckTotal
            }

            const player = vezDoX === true ? '1' : '2'

            setTimeout(() => {
                if (checkWin()) {
                    alert(`O Jogador ${player} venceu o jogo!`)
                    resetGame()
                    return
                }
            }, 10)

            const draw = [...allBox].every(box => box.textContent !== '')

            setTimeout(() => {
                if (draw) {
                    alert(`Deu velha!`)
                    resetGame()
                    return
                }
            }, 10)
        
            vezDoX = !vezDoX
        })
    })
})

btnInteligency.addEventListener('click', () => {
    disabledBtn()

    allBox.forEach(box => {
        box.addEventListener('click', () => {
            if (box.textContent !== '') return

            box.style.color = 'Red'
            box.textContent = 'X'
            xCheckTotal++
            xCheck.textContent = xCheckTotal

            let boxClear = []
            allBox.forEach((b, index) => {
                if (b.textContent === '') boxClear.push(index)
            })

            setTimeout(() => {
                if (checkWin()) {
                    alert(`Você venceu o jogo!`)
                    resetGame()
                    return
                }

                if (boxClear.length === 0) {
                    alert(`Deu velha!`)
                    resetGame()
                    return
                }

                let indexRandom = Math.floor(Math.random() * boxClear.length)
                let drawnIndex = boxClear[indexRandom]

                allBox[drawnIndex].style.color = 'Green'
                allBox[drawnIndex].textContent = 'O'
                oCheckTotal++
                oCheck.textContent = oCheckTotal
            }, 10)

            setTimeout(() => {
                if (checkWin()) {
                    alert(`A Maquina venceu o jogo!`)
                    resetGame()
                    return
                }

                if (boxClear.length === 0) {
                    alert(`Deu velha!`)
                    resetGame()
                    return
                }
            }, 20)
        })
    })
})