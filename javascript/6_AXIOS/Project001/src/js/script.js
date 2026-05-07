'use strict';

const mainContainer = document.querySelector('.main-container')
const secondContainer = document.querySelector('.second-container')
const titleInput = document.querySelector('#inTitle')
const contentInput = document.querySelector('#inContent')
const btnSubmit = document.querySelector('#btnSubmit')

const limparInput = () => {
    titleInput.value = ''
    contentInput.value = ''
}

class ApiPost {
    static async enviar(dados) {
        return await axios.post('https://jsonplaceholder.typicode.com/posts', dados)
    }
}

class PostComponent {
    constructor(response, idPost) {
        this.title = response.data.title
        this.body = response.data.body
        this.id = idPost
    }
    gerarHtml(container) {
        const boxCard = document.createElement('div')
        boxCard.classList.add('card')

        const small = document.createElement('small')
        small.textContent = 'Post: '

        const span = document.createElement('span')
        span.classList.add('id-post')
        span.textContent = this.id

        const titlePost = document.createElement('h3')
        titlePost.textContent = this.title

        const bodyPost = document.createElement('p')
        bodyPost.textContent = this.body

        small.append(span)
        boxCard.append(small, titlePost, bodyPost)
        container.append(boxCard)
    }
}

let idPost = 1

btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault()
    debugger

    try {
        const titleUser = titleInput.value
        const contentUser = contentInput.value

        const response = await ApiPost.enviar({ title: titleUser, body: contentUser, userId: 1 })

        if (response.status >= 200 && response.status < 300) {
            const newPost = new PostComponent(response, idPost)
            newPost.gerarHtml(mainContainer)
            idPost++
            limparInput()
        }
    } catch (err) {
        console.log('Erro na requisição:', err)
    }
   
})