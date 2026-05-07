'use strict';

/* Api JSONPlaceholder entregar: Nome, Email e Empresa apartir do ID que o usuário digitar e mostrar na tela. */

const frm = document.querySelector('#frm')
const idUserInput = document.querySelector('#inIdUser')
const containerCard = document.querySelector('.container-card-user')
const btnSearch = document.querySelector('#btnSearch')
let idsSearched = []

class ApiGet {
    static async getData(id) {
        return await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    }
}

class ApiGetHtml {
    constructor(response) {
        this.name = response.data.name || 'Nome não encontrado'
        this.email = response.data.email || 'Email não encontrado'
        this.company = response.data.company?.name || 'Empresa não encontrada'
    }

    createHtmlUser(container, idUser) {
        const boxCard = document.createElement('div')
        boxCard.classList.add('card-user')

        const boxInfo = document.createElement('div')
        boxInfo.classList.add('info-user')

        const nameUser = document.createElement('h3')
        nameUser.textContent = this.name

        const emailUser = document.createElement('p')
        emailUser.textContent = this.email

        const companyUser = document.createElement('h4')
        companyUser.textContent = this.company

        const boxBtn = document.createElement('div')
        boxBtn.classList.add('btn-card')

        const btnConfirm = document.createElement('button')
        btnConfirm.textContent = 'Finalizar'
        btnConfirm.classList.add('btn-confirm')

        const btnDelete = document.createElement('button')
        btnDelete.textContent = 'Excluir'
        btnDelete.classList.add('btn-delete')

        boxInfo.append(nameUser, emailUser, companyUser)
        boxBtn.append(btnConfirm, btnDelete)
        boxCard.append(boxInfo, boxBtn)
        container.append(boxCard)

        btnConfirm.addEventListener('click', () => {
            boxInfo.classList.toggle('finished')
        })

        btnDelete.addEventListener('click', () => {
            const index = idsSearched.indexOf(idUser)
            if (index !== -1) {
                boxCard.remove()
                idsSearched.splice(index, 1)
            }
        })
    }
}

btnSearch.addEventListener('click', async (e) => {
    e.preventDefault()

    try {
        btnSearch.disabled = true
        btnSearch.textContent = 'Buscando...'

        const idUser = Number(idUserInput.value)

        const index = idsSearched.indexOf(idUser)
        if (index === -1) {
            const response = await ApiGet.getData(idUser)
            const userCard = new ApiGetHtml(response)
            userCard.createHtmlUser(containerCard, idUser)
            idsSearched.push(idUser)
        } else alert('O usuário com esse ID ja foi buscado.')
    } catch(err) {
        console.log('Erro ao buscar usuário:', err)
        alert('Usuário não encontrado ou erro na conexão!');
    } finally {
        btnSearch.disabled = false
        btnSearch.textContent = 'Buscar'
        idUserInput.value = ''
        idUserInput.focus()
    }
})

/* Api JSONPlaceholder postar: Titulo e Conteúdo que o usuário digitar nos inputs e mostrar na tela. */

const titleInput = document.querySelector('#inTitleUser')
const contentInput = document.querySelector('#inContentUser')
const containerCardPost = document.querySelector('.container-card-post')
const btnPost = document.querySelector('#btnPost')

const limparInput = () => {
    titleInput.value = ''
    contentInput.value = ''
    titleInput.focus()
}

class ApiPost {
    static async postData(data) {
        return await axios.post('https://jsonplaceholder.typicode.com/posts', data)
    }
}

class PostComponent {
    constructor(response, idPost) {
        this.title = response.data.title || 'Titulo não encontrado'
        this.body = response.data.body || 'Conteúdo não encontrado'
        this.id = idPost
    }

    createHtmlPost(container) {
        const boxPost = document.createElement('div')
        boxPost.classList.add('card-post')

        const infoPost = document.createElement('div')
        infoPost.classList.add('info-post')

        const titlePost = document.createElement('h3')
        titlePost.textContent = this.title

        const contentPost = document.createElement('p')
        contentPost.textContent = this.body

        const boxBtn = document.createElement('div')
        boxBtn.classList.add('btn-card')

        const small = document.createElement('small')
        small.textContent = 'Post: '

        const postId = document.createElement('span')
        postId.textContent = this.id

        const btnDelete = document.createElement('button')
        btnDelete.textContent = 'Excluir'
        btnDelete.classList.add('btn-delete')

        infoPost.append(titlePost, contentPost)
        small.append(postId)
        boxBtn.append(small, btnDelete)
        boxPost.append(infoPost, boxBtn)
        container.append(boxPost)

        btnDelete.addEventListener('click', () => {
            boxPost.remove()
        })
    }
}

let idPost = 1

btnPost.addEventListener('click', async () => {
    try {
        debugger

        const titleUser = titleInput.value
        const contentUser = contentInput.value

        const response = await ApiPost.postData({ title: titleUser, body: contentUser, userId: 1 })

        if (response.status >= 200 && response.status < 300) {
            const newPost = new PostComponent(response, idPost)
            newPost.createHtmlPost(containerCardPost)
            idPost++
            limparInput()
        } else alert('teste')
        
    } catch(err) {
        console.log('Erro ao Postar conteúdo:', err)
        alert('Erro ao Postar conteúdo:', err)
    }
})