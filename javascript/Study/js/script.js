/* 1- Métodos

const animal = {
    nome: 'Lobinho',
    latir: function() {
        console.log('Au Au')
    }
}

animal.latir()

// 2- Aprofundando em Métodos

const pessoa = {
    nome: 'Gustavo',

    getNome: function() {
        return this.nome
    },

    setNome: function(novoNome) {
        this.nome = novoNome
    }
}

console.log(pessoa.nome)
console.log(pessoa.getNome())

pessoa.setNome('Josue')
console.log(pessoa.getNome())

// 3- Classes Básicas

const cachorro = {
    nome: null,
    raca: null,
    cor: null,
    patas: 4
}

const spitzAlemao = Object.create(cachorro)
spitzAlemao.nome = 'Lobinho'
spitzAlemao.raca = 'Spitz Alemão'
spitzAlemao.cor = 'Branco'

console.log(spitzAlemao)

const bulldog = Object.create(cachorro)
bulldog.nome = 'Bob'
bulldog.raca = 'Bulldog'
bulldog.cor = 'Marrom'

console.log(bulldog)

// 4- Funções Construtoras

function Cachorro(nome, raca) {
    this.nome = nome
    this.raca = raca
}

const lobinho = new Cachorro('Lobinho', 'Spitz Alemão')
console.log(lobinho)

const floquinho = new Cachorro('Floquinho', 'Lulu da Pomerania')
console.log(floquinho)
*/

// 5 - Classes

class Caminhao {
    constructor(name, age, eixos, color) {
        this.name = name
        this.age = age
        this.eixos = eixos
        this.color = color
    }

    criarCaminhao() {
        console.log(`O dono desse caminhão se chama ${this.name} e tem ${this.age} anos. O caminhão tem ${this.eixos} eixos e é da cor ${this.color}.`)
    }
}

const scaniaRay = new Caminhao('Ray', 18, 6, 'Preto')
console.log(scaniaRay)
