"use strict";

const passInput = document.querySelector('#inPass')
const strengthColor = document.querySelector('.color-bar')
const respPass = document.querySelector('.res-pass')

passInput.addEventListener('input', () => {
    
    const passUser = passInput.value
    let score = 0

    score = /[a-z]/.test(passUser) ? score += 1 : score
    score = /[A-Z]/.test(passUser) ? score += 1 : score
    score = /\d/.test(passUser) ? score += 1 : score
    score = /\W/.test(passUser) ? score += 1 : score

    UpdateUI(score)
})

function UpdateUI(score) {
    let width = '0%'
    let color = ''
    let text = ''

    switch (score) {
        case 1:
            width = '25%'; color = 'red'; text = 'Fraca'
            break
        case 2:
            width = '50%'; color = 'orange'; text = 'Moderada'
            break
        case 3:
            width = '75%'; color = 'yellow'; text = 'Forte'
            break
        case 4:
            width = '100%'; color = 'green'; text = 'Muito Forte'
            break
        default:
            width = '0%'; text = '';
    }

    strengthColor.style.width = width;
    strengthColor.style.backgroundColor = color;
    respPass.textContent = text;
}