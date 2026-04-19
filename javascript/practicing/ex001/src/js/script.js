/* 1 - Biblioteca

class Livro {
    constructor(title, author, disponivel) {
        this.title = title
        this.author = author
        this._disponivel = disponivel
    }

    set marcarLivro(novoStatus) {
        this._disponivel = novoStatus
        if (this.disponivel === false) {
            console.log(`O livro ${this.title} está INDISPONÍVEL.`)
        }
        else console.log(`${this.title} está DISPONÍVEL.`)
    }

    get pegarLivro() {
        return `${this.title} - ${this.author}`
    }
}

const myLivro = new Livro('Pequeno Principe', 'José Machado', true)

console.log(myLivro.pegarLivro)
myLivro.marcarLivro = false
// 2 - Carrinho de Compras

class Cart {
    constructor() {
        this._products = []
    }

    addProduct(name, price) {
        this._products.push({ name, price })
        console.log(`${name} adicionado ao carrinho.`);
    }

    set deleteProduct(name) {
        const indice = this._products.findIndex(p => p.name === name)
        if (indice !== -1) {
            this._products.splice(indice, 1)
            console.log(`${name} removido.`);
        }
    }

    get totalValue() {
        return this._products.reduce((total, p) => total + p.price, 0)
    }
}

const myCart = new Cart()
myCart.addProduct('Arroz', 20)
myCart.addProduct('Feijão', 8)
myCart.addProduct('Macarrão', 10)

console.log(`Total: R$ ${myCart.totalValue}`)

myCart.deleteProduct = 'Feijão'

console.log(`Total: R$ ${myCart.totalValue}`)

// 3 - Personagem de Jogo (Herança)

class Personagem {
    constructor(name, attack) {
        this.name = name
        this.attack = attack
        this.life = 100
    }

    receberDano(quantidade) {
        this.life -= quantidade
        if (this.life > 0) console.log(`${this.name} recebeu ${quantidade} de dano e agora tem ${this.life} de vida.`)
        else console.log(`${this.name} MORREU!`)
    }
}

class Mago extends Personagem {
    constructor(name, attack) {
        super(name, attack)
    }

    magoAttack(alvo) {
        console.log(`O mago ${this.name} lançou um FEITIÇO em ${alvo.name}!`)
        alvo.receberDano(this.attack)
    }
}

class Guerreiro extends Personagem {
    constructor(name, attack) {
        super(name, attack)
    }

    guerreiroAttack(alvo) {
        console.log(`O guerreiro ${this.name} utilizou seu ATAQUE ESPECIAL em ${alvo.name}!`)
        alvo.receberDano(this.attack)
    }
}

const myCharacter = new Personagem()
const inimigo = new Personagem('Orc', 25)

const myMago = new Mago('Kirito', 35)
const myGuerreiro = new Guerreiro('Asuna', 50)

console.log(myMago)
console.log(myGuerreiro)
console.log(inimigo)

myMago.magoAttack(myGuerreiro)

myGuerreiro.guerreiroAttack(myMago)
myGuerreiro.guerreiroAttack(myMago)

myGuerreiro.guerreiroAttack(inimigo)
myGuerreiro.guerreiroAttack(inimigo)

console.log(myMago)
console.log(myGuerreiro)
console.log(inimigo)

// 4 - Conta Bancária

class bankAccount {
    constructor(nameAccount) {
        this.name = nameAccount
        this._saldo = 0
    }

    set saldo(newValue) {
        if (newValue < 0) {
            console.log('ERRO: Saldo não pode ser negativo!')
        } else {
            this._saldo = newValue
        }
    }

    deposit(value) {
        if (value <= 0) { 
            console.log('O valor de depósito deve ser maior que R$ 0.')
            return
        }
        this.saldo = this._saldo + value
        console.log(`R$ ${value} foi depositado com sucesso!`)
    }
 
    withDraw(value) {
        if (value === 0) {
            console.log('O valor de saque deve ser maior que R$ 0.')
            return
        }
        if (value > this._saldo) {
            console.log('Saldo insuficiente!')
            return
        }
        this.saldo = this._saldo - value
        console.log(`R$ ${value} foi sacado com sucesso!`)
    }
}

const userAccount = new bankAccount('Ray')

userAccount.deposit(0)
userAccount.withDraw(0)
userAccount.deposit(5)
userAccount.withDraw(10)
userAccount.deposit(45)
userAccount.withDraw(50)
console.log(userAccount)

// 5 - PetShop

class Animal {
    static verHorario() {
        return 'Abrimos das 08h às 18h.'
    }
    constructor(name, specie, limpeza) {
        this.name = name
        this.specie = specie.toUpperCase()
        this.clean = limpeza
    }

    set clean(nivel) {
        if (nivel < 0 || nivel > 10) {
            this._limpeza = 0
        } else {
            this._limpeza = nivel
        }
    }

    darBanho() {
        if (this._limpeza < 10) this._limpeza++
        console.log(`${this.name} tomou banho. Limpeza: ${this._limpeza}/10`)
    }

    get cleanLevel() {
        return `Status de Limpeza do(a) ${this.name}: ${this._limpeza}/10`
    }
}

class Dog extends Animal {
    constructor(name, limpeza) {
        super(name, 'Cachorro', limpeza)
    }
    bark() { console.log(`${this.name}: Au Au!`) }
}

class Cat extends Animal {
    constructor(name, limpeza) {
        super(name, 'Gato', limpeza)
    }
    meow() {
        if (this._limpeza <= 4) {
            console.log(`${this.name} está sujo e ignorou você.`)
            return
        } else console.log(`${this.name}: Miau!`)
    }
}

const lobinho = new Dog('Lobinho', 2)
const cristal = new Cat('Cristal', 1)

console.log(Animal.verHorario())

console.log(lobinho)
console.log(cristal)

console.log(lobinho.cleanLevel)
console.log(cristal.cleanLevel)

cristal.meow()
lobinho.bark()

console.log(lobinho)
console.log(cristal)

// 6 - Academia

class Aluno {

    static nameGym() {
        return 'Academia Hello World - Seja bem-vindo(a)!'
    }

    constructor(name, age) {
        this.name = name
        this.ageAluno = age
        this._status = 'INICIANTE'
        this._frequency = 0
    }

    set ageAluno(age) {
        if (age < 12 || age > 100) {
            console.log('ERROR: Idade inválida, ajustada para o mínimo permitido.')
            this.age = 12
        } else this.age = age
    }

    statusGym() {
        this._status = this._frequency < 10 ? 'INICIANTE' : 'VETERANO'
    }

    get statusEvolucao() {
        return `${this.name} está com uma frequencia de: ${this._frequency} dias e seu status é '${this._status}'.`
    }

    get verificarNome() {
        return `Aluno(a): ${this.name} - Idade: ${this.age}`
    }

    workOut() {
        this._frequency++
        this.statusGym()
        console.log(this.statusEvolucao)
    }
}

class AlunoVIP extends Aluno {
    constructor(name, age, personal) {
        super(name, age)
        this.personal = personal
    }

    workOut() { 
        this._frequency += 2
        this.statusGym()
        console.log(`Treino com o(a) Personal ${this.personal} concluido com sucesso!`)
        console.log(this.statusEvolucao)
    }
}

console.log(Aluno.nameGym())

const myAlunoComum1 = new Aluno('Ray', 18)
const myAlunoVip1 = new AlunoVIP('Ana', 5, 'Gabriela')

console.log(myAlunoComum1)
console.log(myAlunoVip1)

myAlunoVip1.workOut()
myAlunoVip1.workOut()
myAlunoVip1.workOut()
myAlunoComum1.workOut()
myAlunoComum1.workOut()
myAlunoComum1.workOut()
myAlunoComum1.workOut()
myAlunoComum1.workOut()
myAlunoComum1.workOut()
myAlunoComum1.workOut()
myAlunoComum1.workOut()
myAlunoVip1.workOut()
myAlunoVip1.workOut()

console.log(myAlunoComum1)
console.log(myAlunoVip1)

// 7 - Sistema DevLog

class Pedido {
    constructor(produto, peso) {
        this.produto = produto
        this.peso = peso <= 0 ? 1 : peso
    }

    get efetuarPedido() {
        return console.log(`Seu pedido foi efetuado com sucesso!`)
    }
}

class Entregador {
    constructor(name, capacidade) {
        this.name = name
        this.capacidade = capacidade
        this._status = 'PENDENTE'
    }

    realizarEntrega(pedido) {
        if (pedido.peso > this.capacidade) {
            console.log('O veiculo não suporta o peso do produto.')
            return
        }
        else {
            this._status = 'ENTREGUE'
            console.log('Seu produto foi entregue com sucesso!')
        }
    }
}

class Moto extends Entregador {
    constructor(name) {
        super(name, 20)
    }

    buzinar() {
        console.log(`${this.name} Buzinou! - Bibibibi`)
    }
}

class Caminhao extends Entregador {
    constructor(name, capacidade) {
        super(name, capacidade)
    }

    abrirBau() {
        console.log('O baú do caminhão foi aberto!')
    }
}

const moto = new Moto('Ray')
const caminhao = new Caminhao('José', 60)

const fogao = new Pedido('Fogão', 40)
fogao.efetuarPedido
const geladeira = new Pedido('Geladeira', 17)
geladeira.efetuarPedido

moto.realizarEntrega(geladeira)

// 8 - Gerenciamento de Sessões

class Ingresso {
    constructor(nameFilme, type) {
        this.nameFilme = nameFilme
        this.type = type
    }

    set type(tipo) {
        const t = tipo.toUpperCase()
        if (t !== 'INTEIRA' && t !== 'MEIA') {
            this._type = 'INTEIRA'
        } else {
            this._type = tipo
        }
    }
}

class SalaComum {
    static cinema = 'DevCine 3D'
    constructor(name, capacidade) {
        this.name = name
        this._capacidadeTotal = capacidade
        this._assentosOcupados = 0
    }

    venderIngresso(ingresso) {
        if (this._assentosOcupados < this._capacidadeTotal) {
            this._assentosOcupados++
            console.log(`O ingresso para o filme ${ingresso.nameFilme} foi vendido com sucesso. - ${this.name}`)
        }
        else {
            console.log(`Infelizmente todos os ingressos para o filme ${ingresso.nameFilme} foram vendidos.`)
        }
    }
}

class SalaMAX extends SalaComum {
    constructor(name) {
        super(name, 50)
    }

    ativarOculos3D() {
        console.log(`Oculos 3D ativado! - Aproveite o filme!`)
    }
}

console.log(SalaComum.cinema)

const ingressoEnrolados = new Ingresso('Enrolados', 'Inteira')

const salaComum = new SalaComum('SalaComum 01', 30)
salaComum.venderIngresso(ingressoEnrolados)
salaComum.venderIngresso(ingressoEnrolados)
salaComum.venderIngresso(ingressoEnrolados)
salaComum.venderIngresso(ingressoEnrolados)

const salaVip = new SalaMAX('SalaMAX 01')
salaVip.venderIngresso(ingressoEnrolados)

console.log(salaComum)
console.log(salaVip)

// 9 - Gerenciamento de Locadora

class Cliente {
    constructor(name, money) {
        this.name = name
        this.money = money
    }

    set money(money) {
        if (money < 0) {
            this._money = 0
            console.log('Seu saldo não pode ser negativo. Saldo zerado!')
        }
        else this._money = money
    }
}

class CarroComum {
    static empresa = 'DevRent Locadora'
    constructor(placa) {
        this._placa = placa
        this._valorDia = 100
        this._alugado = false
    }

    alugarPara(cliente, dias) {
        const valorTotal = this._valorDia * dias
        const placaVeic = this._placa
        if (this._alugado === true) {
            console.log(`Infelizmente o veiculo com a placa [${placaVeic}] está alugado.`)
        } else if(valorTotal > cliente._money) {
            console.log(`Infelizmente você não tem dinheiro suficiente para efetuar a compra desse veiculo.`)
        } else {
            cliente.money = cliente._money - valorTotal
            this._alugado = true
            console.log(`Carro [${placaVeic}] alugado para ${cliente.name} por ${dias} dias.`)
        }
    }

    devolverVeiculo() {
        if (this._alugado === false) {
            console.log(`ERROR: Carro [${this._placa}] não está alugado.`)
        } else {
            this._alugado = false
            console.log(`Carro [${this._placa}] foi devolvido e está disponivel.`)
        }
    }
}

class CarroLuxo extends CarroComum {
    constructor(placa) {
        super(placa)
        this._valorDia = 300
    }

    abrirTetoSolar() {
        console.log('Teto Solar aberto e você está chamando atenção! 🕶️')
    }
}

console.log(CarroComum.empresa)

const carroComum = new CarroComum('NYE-1533')
const carroLuxo = new CarroLuxo('OZK-1822')
const clienteRay = new Cliente('Ray', 10000)
console.log(carroComum)
console.log(carroLuxo)
console.log(clienteRay)

carroComum.alugarPara(clienteRay, 10)
carroComum.devolverVeiculo()

carroLuxo.alugarPara(clienteRay, 10)
carroLuxo.abrirTetoSolar()

console.log(clienteRay)
console.log(carroComum)
console.log(carroLuxo)

// 10 - Gerenciamento de Hotel

class Hospede {
    constructor(name, days) {
        this.name = name
        this.days = days
    }

    set days(quantity) {
        this._days = quantity < 1 ? 1 : quantity
    }
}

class Room {
    constructor(num) {
        this.num = num
        this._price = 150
        this._hospede = null
        this._ocupped = false
    }

    fazerCheckIn(hospede) {
        if (this._ocupped === false)  {
            this._ocupped = true
            this._hospede = hospede

            const total = this._price * hospede._days

            console.log(`Hospede: ${this._hospede.name} - Quarto ${this.num}`)
            console.log(`O valor a ser pago pelo quarto é: ${total.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
            })}`)
        }
        else {
            console.log(`O quarto [${this.num}] está ocupado por [${this._hospede.name}].`)
        }
    }
}

class SuiteMaster extends Room {
    constructor(num) {
        super(num)
        this._price = 500
    }

    servicoDeQuarto() {
        console.log('Seu quarto foi limpo!')
    }
}

const clienteRay = new Hospede('Ray', 5)
const clienteAna = new Hospede('Ana', 2)
const quartoComum = new Room(2)
const suiteMaster = new SuiteMaster(5)

quartoComum.fazerCheckIn(clienteRay)
quartoComum.fazerCheckIn(clienteAna)
*/