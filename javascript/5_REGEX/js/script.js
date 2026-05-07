/*
let reg1 = /bola/
let reg2 = new RegExp('bola')

console.log(reg2.test('Tem bola?'))
console.log(reg2.test('Não tem'))

console.log(reg1.test('Tem bola?'))
console.log(reg1.test('Não tem'))
*/

let regEx1 = /123/
let regEx2 = /[123]/
let regEx3 = /abc/
let regEx4 = /[abc]/
let regEx5 = /[a-z]/
let regEx6 = /[0-9]/
let regEx7 = /[A-Z]/
let regEx8 = /[a-zA-Z]/

console.log(regEx1.test('Tem essa palavra 123'))
console.log(regEx2.test('Tem 1 ou 2 ou 3'))

console.log(regEx6.test('Tem qualquer número? 023'))
console.log(regEx6.test('Tem qualquer número?'))

console.log(regEx3.test('Tem essa palavra abc'))
console.log(regEx4.test('Tem alguma dessas letras a ou b ou c'))

console.log(regEx5.test('Tem qualquer letra?'))
console.log(regEx5.test('T2e1m qualquer l2et1r3a?'))
console.log(regEx5.test('123'))

console.log(regEx7.test('tem qualquer letra maiuscula?'))
console.log(regEx7.test('Tem qualquer Letra Maiuscula?'))
console.log(regEx8.test('tem qualquer letra maiuscula ou MINUSCULA?'))
